import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { deviceTypes, deviceModels, serviceTypes, servicePricing } from '../drizzle/schema.js';

const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle(queryClient);

async function seed() {
  console.log('🌱 Starting database seeding...');

  // Device Types
  console.log('📱 Adding device types...');
  const devices = await db.insert(deviceTypes).values([
    // iPhones
    { nameEn: 'iPhone', nameAr: 'آيفون', brand: 'Apple', category: 'phone', imageUrl: '/devices/iphone.png' },
    // Samsung Phones
    { nameEn: 'Samsung Galaxy', nameAr: 'سامسونج جالاكسي', brand: 'Samsung', category: 'phone', imageUrl: '/devices/samsung.png' },
    // Huawei Phones
    { nameEn: 'Huawei', nameAr: 'هواوي', brand: 'Huawei', category: 'phone', imageUrl: '/devices/huawei.png' },
    // iPads
    { nameEn: 'iPad', nameAr: 'آيباد', brand: 'Apple', category: 'tablet', imageUrl: '/devices/ipad.png' },
    // Samsung Tablets
    { nameEn: 'Samsung Galaxy Tab', nameAr: 'سامسونج جالاكسي تاب', brand: 'Samsung', category: 'tablet', imageUrl: '/devices/samsung-tab.png' },
    // MacBooks
    { nameEn: 'MacBook', nameAr: 'ماك بوك', brand: 'Apple', category: 'laptop', imageUrl: '/devices/macbook.png' },
    // Windows Laptops
    { nameEn: 'Windows Laptop', nameAr: 'لابتوب ويندوز', brand: 'Various', category: 'laptop', imageUrl: '/devices/laptop.png' },
  ]).returning({ id: deviceTypes.id });

  // Device Models - iPhone
  console.log('📲 Adding device models...');
  await db.insert(deviceModels).values([
    // iPhone Models
    { deviceTypeId: 1, modelNameEn: 'iPhone 15 Pro Max', modelNameAr: 'آيفون 15 برو ماكس', releaseYear: 2023 },
    { deviceTypeId: 1, modelNameEn: 'iPhone 15 Pro', modelNameAr: 'آيفون 15 برو', releaseYear: 2023 },
    { deviceTypeId: 1, modelNameEn: 'iPhone 15', modelNameAr: 'آيفون 15', releaseYear: 2023 },
    { deviceTypeId: 1, modelNameEn: 'iPhone 14 Pro Max', modelNameAr: 'آيفون 14 برو ماكس', releaseYear: 2022 },
    { deviceTypeId: 1, modelNameEn: 'iPhone 14 Pro', modelNameAr: 'آيفون 14 برو', releaseYear: 2022 },
    { deviceTypeId: 1, modelNameEn: 'iPhone 14', modelNameAr: 'آيفون 14', releaseYear: 2022 },
    { deviceTypeId: 1, modelNameEn: 'iPhone 13 Pro Max', modelNameAr: 'آيفون 13 برو ماكس', releaseYear: 2021 },
    { deviceTypeId: 1, modelNameEn: 'iPhone 13', modelNameAr: 'آيفون 13', releaseYear: 2021 },
    { deviceTypeId: 1, modelNameEn: 'iPhone 12 Pro Max', modelNameAr: 'آيفون 12 برو ماكس', releaseYear: 2020 },
    { deviceTypeId: 1, modelNameEn: 'iPhone 12', modelNameAr: 'آيفون 12', releaseYear: 2020 },
    
    // Samsung Models
    { deviceTypeId: 2, modelNameEn: 'Samsung Galaxy S24 Ultra', modelNameAr: 'سامسونج جالاكسي S24 الترا', releaseYear: 2024 },
    { deviceTypeId: 2, modelNameEn: 'Samsung Galaxy S24', modelNameAr: 'سامسونج جالاكسي S24', releaseYear: 2024 },
    { deviceTypeId: 2, modelNameEn: 'Samsung Galaxy S23 Ultra', modelNameAr: 'سامسونج جالاكسي S23 الترا', releaseYear: 2023 },
    { deviceTypeId: 2, modelNameEn: 'Samsung Galaxy S23', modelNameAr: 'سامسونج جالاكسي S23', releaseYear: 2023 },
    { deviceTypeId: 2, modelNameEn: 'Samsung Galaxy Z Fold 5', modelNameAr: 'سامسونج جالاكسي Z فولد 5', releaseYear: 2023 },
    
    // Huawei Models
    { deviceTypeId: 3, modelNameEn: 'Huawei P60 Pro', modelNameAr: 'هواوي P60 برو', releaseYear: 2023 },
    { deviceTypeId: 3, modelNameEn: 'Huawei Mate 60 Pro', modelNameAr: 'هواوي ميت 60 برو', releaseYear: 2023 },
    
    // iPad Models
    { deviceTypeId: 4, modelNameEn: 'iPad Pro 12.9" (2023)', modelNameAr: 'آيباد برو 12.9 بوصة (2023)', releaseYear: 2023 },
    { deviceTypeId: 4, modelNameEn: 'iPad Air (2023)', modelNameAr: 'آيباد اير (2023)', releaseYear: 2023 },
    { deviceTypeId: 4, modelNameEn: 'iPad (10th Gen)', modelNameAr: 'آيباد (الجيل العاشر)', releaseYear: 2022 },
    
    // Samsung Tablets
    { deviceTypeId: 5, modelNameEn: 'Galaxy Tab S9 Ultra', modelNameAr: 'جالاكسي تاب S9 الترا', releaseYear: 2023 },
    { deviceTypeId: 5, modelNameEn: 'Galaxy Tab S9', modelNameAr: 'جالاكسي تاب S9', releaseYear: 2023 },
    
    // MacBook Models
    { deviceTypeId: 6, modelNameEn: 'MacBook Pro 16" M3', modelNameAr: 'ماك بوك برو 16 بوصة M3', releaseYear: 2023 },
    { deviceTypeId: 6, modelNameEn: 'MacBook Pro 14" M3', modelNameAr: 'ماك بوك برو 14 بوصة M3', releaseYear: 2023 },
    { deviceTypeId: 6, modelNameEn: 'MacBook Air M2', modelNameAr: 'ماك بوك اير M2', releaseYear: 2022 },
    
    // Windows Laptops
    { deviceTypeId: 7, modelNameEn: 'Dell XPS 15', modelNameAr: 'ديل XPS 15', releaseYear: 2023 },
    { deviceTypeId: 7, modelNameEn: 'HP Spectre x360', modelNameAr: 'اتش بي سبكتر x360', releaseYear: 2023 },
    { deviceTypeId: 7, modelNameEn: 'Lenovo ThinkPad X1', modelNameAr: 'لينوفو ثينك باد X1', releaseYear: 2023 },
  ]);

  // Service Types
  console.log('🔧 Adding service types...');
  await db.insert(serviceTypes).values([
    {
      nameEn: 'Screen Replacement',
      nameAr: 'تغيير الشاشة',
      descriptionEn: 'Complete screen replacement with high-quality parts',
      descriptionAr: 'تغيير الشاشة بالكامل بقطع غيار عالية الجودة',
      iconName: 'Smartphone',
      estimatedDuration: 45,
    },
    {
      nameEn: 'Battery Replacement',
      nameAr: 'تغيير البطارية',
      descriptionEn: 'Replace old battery with genuine parts',
      descriptionAr: 'استبدال البطارية القديمة بقطع أصلية',
      iconName: 'Battery',
      estimatedDuration: 30,
    },
    {
      nameEn: 'Charging Port Repair',
      nameAr: 'إصلاح منفذ الشحن',
      descriptionEn: 'Fix or replace charging port',
      descriptionAr: 'إصلاح أو استبدال منفذ الشحن',
      iconName: 'Plug',
      estimatedDuration: 40,
    },
    {
      nameEn: 'Water Damage Repair',
      nameAr: 'إصلاح أضرار السوائل',
      descriptionEn: 'Professional cleaning and repair for water-damaged devices',
      descriptionAr: 'تنظيف وإصلاح احترافي للأجهزة المتضررة من السوائل',
      iconName: 'Droplet',
      estimatedDuration: 120,
    },
    {
      nameEn: 'Camera Repair',
      nameAr: 'إصلاح الكاميرا',
      descriptionEn: 'Fix or replace front/back camera',
      descriptionAr: 'إصلاح أو استبدال الكاميرا الأمامية/الخلفية',
      iconName: 'Camera',
      estimatedDuration: 35,
    },
    {
      nameEn: 'Speaker Repair',
      nameAr: 'إصلاح السماعة',
      descriptionEn: 'Fix audio issues and replace speakers',
      descriptionAr: 'إصلاح مشاكل الصوت واستبدال السماعات',
      iconName: 'Volume2',
      estimatedDuration: 30,
    },
    {
      nameEn: 'Software Issues',
      nameAr: 'مشاكل البرامج',
      descriptionEn: 'Fix software problems, updates, and performance issues',
      descriptionAr: 'إصلاح مشاكل البرامج والتحديثات ومشاكل الأداء',
      iconName: 'Settings',
      estimatedDuration: 60,
    },
    {
      nameEn: 'Back Glass Replacement',
      nameAr: 'تغيير الغطاء الخلفي',
      descriptionEn: 'Replace cracked or damaged back glass',
      descriptionAr: 'استبدال الغطاء الخلفي المكسور أو التالف',
      iconName: 'Shield',
      estimatedDuration: 50,
    },
  ]);

  // Service Pricing - Sample prices for iPhone models
  console.log('💰 Adding service pricing...');
  await db.insert(servicePricing).values([
    // iPhone 15 Pro Max - Screen
    { deviceModelId: 1, serviceTypeId: 1, priceInSAR: 149900, warrantyDays: 180 }, // 1499 SAR
    { deviceModelId: 1, serviceTypeId: 2, priceInSAR: 39900, warrantyDays: 90 },   // 399 SAR
    { deviceModelId: 1, serviceTypeId: 3, priceInSAR: 29900, warrantyDays: 90 },
    { deviceModelId: 1, serviceTypeId: 4, priceInSAR: 49900, warrantyDays: 60 },
    { deviceModelId: 1, serviceTypeId: 5, priceInSAR: 59900, warrantyDays: 90 },
    
    // iPhone 15 Pro
    { deviceModelId: 2, serviceTypeId: 1, priceInSAR: 129900, warrantyDays: 180 },
    { deviceModelId: 2, serviceTypeId: 2, priceInSAR: 37900, warrantyDays: 90 },
    { deviceModelId: 2, serviceTypeId: 3, priceInSAR: 27900, warrantyDays: 90 },
    
    // iPhone 15
    { deviceModelId: 3, serviceTypeId: 1, priceInSAR: 99900, warrantyDays: 180 },
    { deviceModelId: 3, serviceTypeId: 2, priceInSAR: 34900, warrantyDays: 90 },
    
    // Samsung S24 Ultra
    { deviceModelId: 11, serviceTypeId: 1, priceInSAR: 119900, warrantyDays: 180 },
    { deviceModelId: 11, serviceTypeId: 2, priceInSAR: 35900, warrantyDays: 90 },
    { deviceModelId: 11, serviceTypeId: 3, priceInSAR: 25900, warrantyDays: 90 },
    
    // MacBook Pro 16" M3
    { deviceModelId: 23, serviceTypeId: 1, priceInSAR: 299900, warrantyDays: 180 },
    { deviceModelId: 23, serviceTypeId: 2, priceInSAR: 79900, warrantyDays: 90 },
    { deviceModelId: 23, serviceTypeId: 7, priceInSAR: 49900, warrantyDays: 30 },
  ]);

  console.log('✅ Database seeding completed successfully!');
}

seed()
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
