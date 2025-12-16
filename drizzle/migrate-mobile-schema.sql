-- Migration: Merge Mobile App Schema with Website
-- This migration adds mobile app tables to existing PostgreSQL database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing conflicting tables if any (be careful in production)
-- DROP TABLE IF EXISTS reviews CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS services CASCADE;

-- Services table (from mobile app)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  icon TEXT,
  price_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table (from mobile app) - replaces service_requests
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id),
  technician_id INTEGER REFERENCES technicians(id),
  device_brand TEXT NOT NULL,
  device_model TEXT NOT NULL,
  issue_description TEXT,
  estimated_price DECIMAL(10, 2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  address TEXT,
  city TEXT,
  phone_number TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table (from mobile app) - simplified version
CREATE TABLE IF NOT EXISTS order_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  technician_id INTEGER NOT NULL REFERENCES technicians(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default services
INSERT INTO services (name, description, category, icon, price_range) VALUES
  ('Screen Replacement', 'Professional screen repair for all devices', 'phones', 'smartphone', '200-500 SAR'),
  ('Battery Replacement', 'Replace old or damaged batteries', 'phones', 'battery-charging', '150-300 SAR'),
  ('Camera Repair', 'Fix camera issues and replacements', 'phones', 'camera', '250-400 SAR'),
  ('Laptop Screen Repair', 'Laptop display repair and replacement', 'laptops', 'laptop', '400-800 SAR'),
  ('Laptop Keyboard Repair', 'Keyboard replacement and repair', 'laptops', 'keyboard', '200-500 SAR'),
  ('Tablet Screen Repair', 'Tablet display repair services', 'tablets', 'tablet', '300-600 SAR'),
  ('Smart Watch Repair', 'Smart watch screen and battery repair', 'watches', 'watch', '150-400 SAR'),
  ('Printer Repair', 'Printer maintenance and repair', 'printers', 'print', '200-500 SAR')
ON CONFLICT DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for orders updated_at
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_technician_id ON orders(technician_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_reviews_technician_id ON order_reviews(technician_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);

-- Grant permissions
GRANT ALL ON services TO PUBLIC;
GRANT ALL ON orders TO PUBLIC;
GRANT ALL ON order_reviews TO PUBLIC;

-- Success message
SELECT 'Mobile app schema merged successfully!' AS status;
