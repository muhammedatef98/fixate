-- Unified Database Schema Migration
-- This migration adds mobile app fields to the existing web database schema
-- to support both web and mobile applications with the same database

-- Add new columns to service_requests table to support mobile app fields
ALTER TABLE service_requests 
ADD COLUMN IF NOT EXISTS device_type VARCHAR(20), -- 'phone', 'tablet', 'laptop', 'watch'
ADD COLUMN IF NOT EXISTS device_brand VARCHAR(100), -- Brand name (Apple, Samsung, etc.)
ADD COLUMN IF NOT EXISTS device_model_name VARCHAR(100), -- Model name as string
ADD COLUMN IF NOT EXISTS service_type VARCHAR(20), -- 'mobile' or 'pickup'
ADD COLUMN IF NOT EXISTS issue_id VARCHAR(50), -- Issue identifier from mobile app
ADD COLUMN IF NOT EXISTS estimated_price INTEGER, -- Estimated price in SAR
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8), -- GPS latitude
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8), -- GPS longitude
ADD COLUMN IF NOT EXISTS media_urls TEXT[]; -- Array of media file URLs

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_service_requests_device_type ON service_requests(device_type);
CREATE INDEX IF NOT EXISTS idx_service_requests_device_brand ON service_requests(device_brand);
CREATE INDEX IF NOT EXISTS idx_service_requests_service_type ON service_requests(service_type);
CREATE INDEX IF NOT EXISTS idx_service_requests_issue_id ON service_requests(issue_id);

-- Update existing records to have default values
UPDATE service_requests 
SET 
  service_type = CASE 
    WHEN serviceMode = 'express' THEN 'mobile'
    WHEN serviceMode = 'pickup' THEN 'pickup'
    ELSE 'mobile'
  END
WHERE service_type IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN service_requests.device_type IS 'Type of device: phone, tablet, laptop, watch';
COMMENT ON COLUMN service_requests.device_brand IS 'Brand name from mobile app (Apple, Samsung, Huawei, etc.)';
COMMENT ON COLUMN service_requests.device_model_name IS 'Model name as string for mobile app compatibility';
COMMENT ON COLUMN service_requests.service_type IS 'Service type: mobile (on-site) or pickup (collect and deliver)';
COMMENT ON COLUMN service_requests.issue_id IS 'Issue identifier from mobile app issue list';
COMMENT ON COLUMN service_requests.estimated_price IS 'Estimated repair price in SAR';
COMMENT ON COLUMN service_requests.latitude IS 'GPS latitude coordinate';
COMMENT ON COLUMN service_requests.longitude IS 'GPS longitude coordinate';
COMMENT ON COLUMN service_requests.media_urls IS 'Array of uploaded media file URLs (images/videos)';

-- Create a view for unified data access
CREATE OR REPLACE VIEW unified_service_requests AS
SELECT 
  sr.id,
  sr.userId,
  sr.deviceModelId,
  sr.serviceTypeId,
  sr.pricingId,
  
  -- Web fields
  sr.serviceMode,
  sr.issueDescription,
  sr.address,
  sr.city,
  sr.country,
  sr.phoneNumber,
  sr.preferredDate,
  sr.preferredTimeSlot,
  sr.status,
  sr.technicianId,
  sr.assignedAt,
  sr.completedAt,
  sr.rating,
  sr.reviewText,
  sr.totalAmount,
  sr.paymentMethod,
  sr.paymentStatus,
  sr.createdAt,
  sr.updatedAt,
  
  -- Mobile fields
  sr.device_type,
  sr.device_brand,
  sr.device_model_name,
  sr.service_type,
  sr.issue_id,
  sr.estimated_price,
  sr.latitude,
  sr.longitude,
  sr.media_urls,
  
  -- Joined data
  dm.modelNameEn as device_model_en,
  dm.modelNameAr as device_model_ar,
  st.nameEn as service_name_en,
  st.nameAr as service_name_ar,
  u.name as user_name,
  u.email as user_email,
  u.phone as user_phone
FROM service_requests sr
LEFT JOIN device_models dm ON sr.deviceModelId = dm.id
LEFT JOIN service_types st ON sr.serviceTypeId = st.id
LEFT JOIN users u ON sr.userId = u.id;

-- Create function to insert unified service request
CREATE OR REPLACE FUNCTION insert_unified_service_request(
  p_userId INTEGER,
  p_deviceModelId INTEGER DEFAULT NULL,
  p_serviceTypeId INTEGER DEFAULT NULL,
  p_serviceMode VARCHAR DEFAULT 'mobile',
  p_issueDescription TEXT DEFAULT NULL,
  p_address TEXT DEFAULT NULL,
  p_city VARCHAR DEFAULT NULL,
  p_phoneNumber VARCHAR DEFAULT NULL,
  p_preferredTimeSlot VARCHAR DEFAULT NULL,
  p_paymentMethod VARCHAR DEFAULT 'cash_on_delivery',
  
  -- Mobile fields
  p_device_type VARCHAR DEFAULT NULL,
  p_device_brand VARCHAR DEFAULT NULL,
  p_device_model_name VARCHAR DEFAULT NULL,
  p_service_type VARCHAR DEFAULT NULL,
  p_issue_id VARCHAR DEFAULT NULL,
  p_estimated_price INTEGER DEFAULT NULL,
  p_latitude DECIMAL DEFAULT NULL,
  p_longitude DECIMAL DEFAULT NULL,
  p_media_urls TEXT[] DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
  v_request_id INTEGER;
BEGIN
  INSERT INTO service_requests (
    userId,
    deviceModelId,
    serviceTypeId,
    serviceMode,
    issueDescription,
    address,
    city,
    phoneNumber,
    preferredTimeSlot,
    paymentMethod,
    device_type,
    device_brand,
    device_model_name,
    service_type,
    issue_id,
    estimated_price,
    latitude,
    longitude,
    media_urls,
    status,
    paymentStatus
  ) VALUES (
    p_userId,
    p_deviceModelId,
    p_serviceTypeId,
    COALESCE(p_serviceMode, p_service_type, 'mobile'),
    p_issueDescription,
    p_address,
    p_city,
    p_phoneNumber,
    p_preferredTimeSlot,
    p_paymentMethod,
    p_device_type,
    p_device_brand,
    p_device_model_name,
    COALESCE(p_service_type, p_serviceMode, 'mobile'),
    p_issue_id,
    p_estimated_price,
    p_latitude,
    p_longitude,
    p_media_urls,
    'pending',
    'pending'
  )
  RETURNING id INTO v_request_id;
  
  RETURN v_request_id;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT SELECT ON unified_service_requests TO PUBLIC;
GRANT EXECUTE ON FUNCTION insert_unified_service_request TO PUBLIC;

-- Migration complete
-- This schema now supports both web and mobile applications
