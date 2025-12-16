import { getDb } from './server/db.js';
import { deviceTypes, deviceModels, serviceTypes, servicePricing, users, technicians } from './drizzle/schema.js';

async function seedDatabase() {
  const db = await getDb();
  if (!db) {
    throw new Error('Database connection not available');
  }

  console.log('🌱 Starting database seeding...');

  try {
    // Add sample users
    console.log('👥 Adding sample users...');
    await db.insert(users).values([
      {
        openId: 'admin_001',
        name: 'Admin User',
        email: 'admin@fixate.com',
        role: 'admin',
        loginMethod: 'email',
        lastSignedIn: new Date(),
      },
      {
        openId: 'customer_001',
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        role: 'customer',
        loginMethod: 'email',
        lastSignedIn: new Date(),
      },
      {
        openId: 'customer_002',
        name: 'سارة عبدالله',
        email: 'sara@example.com',
        role: 'customer',
        loginMethod: 'email',
        lastSignedIn: new Date(),
      },
    ]).onConflictDoNothing();

    // Add sample technicians
    console.log('🔧 Adding sample technicians...');
    await db.insert(technicians).values([
      {
        userId: 1,
        fullName: 'محمد أحمد',
        phoneNumber: '+966501234567',
        specialization: 'iPhone Specialist',
        yearsOfExperience: 5,
        rating: 48,
        completedJobs: 150,
        isActive: true,
        isAvailable: true,
        currentLatitude: '24.7136',
        currentLongitude: '46.6753',
      },
      {
        userId: 2,
        fullName: 'خالد السعيد',
        phoneNumber: '+966502345678',
        specialization: 'Samsung & Android Expert',
        yearsOfExperience: 4,
        rating: 46,
        completedJobs: 120,
        isActive: true,
        isAvailable: true,
        currentLatitude: '24.7200',
        currentLongitude: '46.6800',
      },
      {
        userId: 3,
        fullName: 'عبدالله الغامدي',
        phoneNumber: '+966503456789',
        specialization: 'MacBook & Laptop Specialist',
        yearsOfExperience: 6,
        rating: 50,
        completedJobs: 200,
        isActive: true,
        isAvailable: true,
        currentLatitude: '24.7100',
        currentLongitude: '46.6700',
      },
    ]).onConflictDoNothing();

    console.log('✅ Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('   - 3 Users added');
    console.log('   - 3 Technicians added');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

seedDatabase()
  .then(() => {
    console.log('✅ Seed script completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seed script failed:', err);
    process.exit(1);
  });
