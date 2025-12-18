/**
 * Unified Service Requests API
 * Handles requests from both web and mobile applications
 */

import { Router } from 'express';
import { db } from '../db';
import { serviceRequests } from '../../drizzle/schema';
import { eq, desc } from 'drizzle-orm';

const router = Router();

/**
 * Create a new service request (unified endpoint for web and mobile)
 * POST /api/unified-requests
 */
router.post('/', async (req, res) => {
  try {
    const {
      // Web fields
      userId,
      deviceModelId,
      serviceTypeId,
      pricingId,
      serviceMode,
      issueDescription,
      address,
      city,
      country = 'Saudi Arabia',
      phoneNumber,
      preferredDate,
      preferredTimeSlot,
      paymentMethod = 'cash_on_delivery',
      
      // Mobile fields
      device_type,
      device_brand,
      device_model_name,
      service_type,
      issue_id,
      estimated_price,
      latitude,
      longitude,
      media_urls,
    } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!address || !city || !phoneNumber) {
      return res.status(400).json({ error: 'Address, city, and phone number are required' });
    }

    // Determine service mode/type (support both naming conventions)
    const finalServiceType = service_type || serviceMode || 'mobile';

    // Insert the request
    const [newRequest] = await db.insert(serviceRequests).values({
      userId,
      deviceModelId: deviceModelId || null,
      serviceTypeId: serviceTypeId || null,
      pricingId: pricingId || null,
      serviceMode: finalServiceType as any,
      issueDescription,
      address,
      city,
      country,
      phoneNumber,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
      preferredTimeSlot,
      paymentMethod: paymentMethod as any,
      
      // Mobile fields
      device_type,
      device_brand,
      device_model_name,
      service_type: finalServiceType,
      issue_id,
      estimated_price,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      media_urls,
      
      status: 'pending',
      paymentStatus: 'pending',
    }).returning();

    // Send email notification (using web3forms)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd3ff12a4-e013-473f-8730-9d5760059a64',
          subject: `🔔 حجز جديد - Fixate`,
          from_name: 'Fixate Platform',
          to: 'fixate01@gmail.com',
          message: `
🆕 حجز جديد!

👤 المستخدم ID: ${userId}
📞 الجوال: ${phoneNumber}

🔧 نوع الخدمة: ${finalServiceType}
📱 الجهاز: ${device_brand || 'N/A'} ${device_model_name || 'N/A'} (${device_type || 'N/A'})
⚠️ المشكلة: ${issue_id || 'N/A'}
📝 التفاصيل: ${issueDescription || 'لا يوجد'}

📍 الموقع: ${address}, ${city}
${latitude && longitude ? `🗺️ الإحداثيات: ${latitude}, ${longitude}` : ''}
💰 السعر التقديري: ${estimated_price || 'N/A'} ريال

⏰ التاريخ: ${new Date().toLocaleString('ar-SA')}
          `.trim(),
        }),
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't block the request if email fails
    }

    res.status(201).json({
      success: true,
      data: newRequest,
      message: 'Service request created successfully',
    });
  } catch (error) {
    console.error('Error creating service request:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create service request',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Get service requests for a user
 * GET /api/unified-requests/user/:userId
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const requests = await db
      .select()
      .from(serviceRequests)
      .where(eq(serviceRequests.userId, parseInt(userId)))
      .orderBy(desc(serviceRequests.createdAt));

    res.json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch requests',
    });
  }
});

/**
 * Get a single service request by ID
 * GET /api/unified-requests/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [request] = await db
      .select()
      .from(serviceRequests)
      .where(eq(serviceRequests.id, parseInt(id)));

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found',
      });
    }

    res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch request',
    });
  }
});

/**
 * Update service request status
 * PATCH /api/unified-requests/:id/status
 */
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required',
      });
    }

    const [updatedRequest] = await db
      .update(serviceRequests)
      .set({
        status: status as any,
        updatedAt: new Date(),
      })
      .where(eq(serviceRequests.id, parseInt(id)))
      .returning();

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        error: 'Request not found',
      });
    }

    res.json({
      success: true,
      data: updatedRequest,
      message: 'Status updated successfully',
    });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update status',
    });
  }
});

/**
 * Assign technician to request
 * PATCH /api/unified-requests/:id/assign
 */
router.patch('/:id/assign', async (req, res) => {
  try {
    const { id } = req.params;
    const { technicianId } = req.body;

    if (!technicianId) {
      return res.status(400).json({
        success: false,
        error: 'Technician ID is required',
      });
    }

    const [updatedRequest] = await db
      .update(serviceRequests)
      .set({
        technicianId: parseInt(technicianId),
        assignedAt: new Date(),
        status: 'confirmed',
        updatedAt: new Date(),
      })
      .where(eq(serviceRequests.id, parseInt(id)))
      .returning();

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        error: 'Request not found',
      });
    }

    res.json({
      success: true,
      data: updatedRequest,
      message: 'Technician assigned successfully',
    });
  } catch (error) {
    console.error('Error assigning technician:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to assign technician',
    });
  }
});

export default router;
