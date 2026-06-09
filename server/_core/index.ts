import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
// OAuth removed - using simple email/password auth
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { seedDatabase } from "../seed";
import { getAllServiceTypes, getAllDeviceTypes, getDeviceModelsByType, getServicePrice } from "../db";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  // Initialize database and seed if needed
  try {
    const serviceTypes = await getAllServiceTypes();
    if (serviceTypes.length === 0) {
      console.log('🌱 Database is empty, seeding...');
      await seedDatabase();
      console.log('✅ Database seeded successfully');
    } else {
      console.log('✅ Database already seeded');
    }
  } catch (error) {
    console.error('⚠️ Database initialization error:', error);
    // If error, try to seed anyway
    try {
      console.log('🌱 Attempting to seed database...');
      await seedDatabase();
      console.log('✅ Database seeded successfully');
    } catch (seedError) {
      console.error('❌ Failed to seed database:', seedError);
    }
  }

  const app = express();
  const server = createServer(app);

  // Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://www.googletagmanager.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        connectSrc: ["'self'", "https:"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false, // needed for Google Maps / iframes
  }));

  // CORS — allow only trusted origins. Applied to /api/* only so that
  // same-origin asset requests (e.g. <script type="module" crossorigin>)
  // never get blocked by CORS even on Render's preview domains.
  const allowedOrigins = [
    "https://fixate.sa",
    "https://www.fixate.sa",
    "https://fixate.site",
    "https://www.fixate.site",
    ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000", "http://localhost:5173"] : []),
  ];
  app.use("/api", cors({
    origin: (origin, cb) => {
      // Allow no-origin (curl/mobile/health pings), allowlisted, and *.onrender.com
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      try {
        const host = new URL(origin).hostname;
        if (host.endsWith(".onrender.com")) return cb(null, true);
      } catch {}
      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }));

  // Rate limiting on auth endpoints — 20 req/15 min per IP
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  });

  // Body parsers — 1mb default protects API routes; raise for specific upload routes if needed.
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));
  // Simple auth endpoints are in tRPC router

  // Keep-alive endpoint — no DB calls, instant 200 for cron-job.org pings
  app.get("/api/ping", (_req, res) => {
    res.status(200).json({ ok: true, ts: Date.now() });
  });

  // Health check endpoint — verifies DB connectivity
  app.get("/api/health", async (_req, res) => {
    const start = Date.now();
    try {
      const { getDb } = await import("../db");
      const { sql } = await import("drizzle-orm");
      const db = await getDb();
      if (!db) throw new Error("DB unavailable");
      await db.execute(sql`SELECT 1`);
      res.status(200).json({ ok: true, db: "up", latency_ms: Date.now() - start });
    } catch (err) {
      console.error("[health] DB check failed:", err);
      res.status(503).json({ ok: false, db: "down" });
    }
  });

  // REST API endpoints for mobile
  app.get("/api/devices/types", async (req, res) => {
    try {
      const types = await getAllDeviceTypes();
      res.json(types);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch device types" });
    }
  });

  app.get("/api/devices/models/:deviceTypeId", async (req, res) => {
    try {
      const deviceTypeId = parseInt(req.params.deviceTypeId);
      const models = await getDeviceModelsByType(deviceTypeId);
      res.json(models);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch device models" });
    }
  });

  app.get("/api/services/types", async (req, res) => {
    try {
      const types = await getAllServiceTypes();
      res.json(types);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service types" });
    }
  });

  app.get("/api/services/price", async (req, res) => {
    try {
      const deviceModelId = parseInt(req.query.deviceModelId as string);
      const serviceTypeId = parseInt(req.query.serviceTypeId as string);
      const price = await getServicePrice(deviceModelId, serviceTypeId);
      res.json(price);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service price" });
    }
  });

  // Auth REST API endpoints (rate-limited)
  app.post("/api/auth/signup", authLimiter, async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
      
      // Validation
      if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: "جميع الحقول مطلوبة" });
      }
      
      // Basic input validation
      if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "بريد إلكتروني غير صالح" });
      }
      if (typeof password !== "string" || password.length < 8) {
        return res.status(400).json({ error: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" });
      }

      // Check if user exists
      const { getUserByEmail, createUser } = await import("../db");
      const { hashPassword } = await import("./simpleAuth");
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "البريد الإلكتروني مستخدم بالفعل" });
      }

      // Hash password before storing
      const hashedPassword = await hashPassword(password);
      const user = await createUser({ name, email, phone, password: hashedPassword, role: "customer" });
      
      res.json({ success: true, user });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "فشل إنشاء الحساب" });
    }
  });

  app.post("/api/auth/login", authLimiter, async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "البريد الإلكتروني وكلمة المرور مطلوبة" });
      }
      
      const { getUserByEmail } = await import("../db");
      const { verifyPassword, createSession, setSessionCookie } = await import("./simpleAuth");
      const user = await getUserByEmail(email);

      // Constant-ish branch: always verify against a hash to avoid trivial timing oracle
      const storedHash = user?.password ?? "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvali";
      const ok = await verifyPassword(password, storedHash);
      if (!user || !ok) {
        return res.status(401).json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      }

      const token = await createSession(user.id, user.email, user.role);
      setSessionCookie(res, token);
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "فشل تسجيل الدخول" });
    }
  });
  
  // Contact form — rate-limited to deter spam
  const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  });
  app.post("/api/contact", contactLimiter, (req, res) => {
    const { name, phone, city, message } = req.body as Record<string, string>;
    if (!name || !phone || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log("[contact]", { name, phone, city: city || "—", message });
    res.json({ ok: true });
  });

  // Unified API for web and mobile
  const unifiedRequestsRouter = await import("../routes/unified-requests");
  app.use("/api/unified-requests", unifiedRequestsRouter.default);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = process.env.NODE_ENV === "production"
    ? preferredPort
    : await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(console.error);
