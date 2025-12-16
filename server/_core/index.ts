import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
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
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Simple auth endpoints are in tRPC router
  
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
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
