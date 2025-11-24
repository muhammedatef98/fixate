/**
 * Moyasar Payment Integration
 * Documentation: https://moyasar.com/docs/api/
 */

interface MoyasarConfig {
  apiKey: string;
  publishableKey: string;
  baseUrl: string;
}

interface PaymentRequest {
  amount: number; // Amount in halalas (1 SAR = 100 halalas)
  currency: string;
  description: string;
  callbackUrl: string;
  source: {
    type: 'creditcard' | 'applepay' | 'stcpay';
    name?: string;
    number?: string;
    cvc?: string;
    month?: string;
    year?: string;
  };
  metadata?: Record<string, any>;
}

interface PaymentResponse {
  id: string;
  status: 'initiated' | 'paid' | 'failed' | 'authorized' | 'captured' | 'refunded';
  amount: number;
  fee: number;
  currency: string;
  refunded: number;
  captured: number;
  refundedAt: string | null;
  capturedAt: string | null;
  voidedAt: string | null;
  description: string;
  amountFormat: string;
  feeFormat: string;
  refundedFormat: string;
  capturedFormat: string;
  invoiceId: string | null;
  ip: string;
  callbackUrl: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
  source: {
    type: string;
    company: string;
    name: string;
    number: string;
    gatewayId: string;
    referenceNumber: string;
    token: string | null;
    message: string | null;
    transactionUrl: string;
  };
}

/**
 * Get Moyasar configuration
 * In production, these should be stored in environment variables
 */
function getMoyasarConfig(): MoyasarConfig {
  return {
    apiKey: process.env.MOYASAR_API_KEY || 'sk_test_XXXXXXXXXXXXXXXXXXXXXXXX',
    publishableKey: process.env.MOYASAR_PUBLISHABLE_KEY || 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXX',
    baseUrl: 'https://api.moyasar.com/v1',
  };
}

/**
 * Create a payment with Moyasar
 */
export async function createPayment(request: PaymentRequest): Promise<PaymentResponse> {
  const config = getMoyasarConfig();
  
  try {
    const response = await fetch(`${config.baseUrl}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(config.apiKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Moyasar API error: ${JSON.stringify(error)}`);
    }

    const payment: PaymentResponse = await response.json();
    return payment;
  } catch (error) {
    console.error('[Moyasar] Payment creation failed:', error);
    throw error;
  }
}

/**
 * Get payment status from Moyasar
 */
export async function getPaymentStatus(paymentId: string): Promise<PaymentResponse> {
  const config = getMoyasarConfig();
  
  try {
    const response = await fetch(`${config.baseUrl}/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(config.apiKey + ':').toString('base64')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Moyasar API error: ${JSON.stringify(error)}`);
    }

    const payment: PaymentResponse = await response.json();
    return payment;
  } catch (error) {
    console.error('[Moyasar] Failed to get payment status:', error);
    throw error;
  }
}

/**
 * Refund a payment
 */
export async function refundPayment(paymentId: string, amount?: number): Promise<PaymentResponse> {
  const config = getMoyasarConfig();
  
  try {
    const body: any = {};
    if (amount) {
      body.amount = amount;
    }

    const response = await fetch(`${config.baseUrl}/payments/${paymentId}/refund`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(config.apiKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Moyasar API error: ${JSON.stringify(error)}`);
    }

    const payment: PaymentResponse = await response.json();
    return payment;
  } catch (error) {
    console.error('[Moyasar] Refund failed:', error);
    throw error;
  }
}

/**
 * Verify payment callback signature
 * Moyasar sends a signature to verify the callback is authentic
 */
export function verifyCallbackSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === expectedSignature;
}

/**
 * Get publishable key for frontend
 */
export function getPublishableKey(): string {
  const config = getMoyasarConfig();
  return config.publishableKey;
}
