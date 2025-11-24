/**
 * Invoice Generator System
 * Generates PDF invoices for completed payments
 */

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate?: Date;
  
  // Company info
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyTaxId?: string;
  
  // Customer info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  
  // Service details
  serviceDescription: string;
  deviceModel: string;
  serviceType: string;
  
  // Pricing
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  
  // Payment
  paymentMethod: string;
  paymentStatus: string;
  paymentDate?: Date;
  
  // Additional
  notes?: string;
}

/**
 * Generate invoice number
 */
export function generateInvoiceNumber(requestId: number): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `INV-${year}${month}-${String(requestId).padStart(6, '0')}`;
}

/**
 * Generate PDF invoice
 * In production, this would use a PDF library like PDFKit or Puppeteer
 */
export async function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
  // For now, return a mock PDF buffer
  // In production, integrate with PDF generation library
  
  const htmlContent = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Arial', sans-serif;
      padding: 40px;
      background: #f5f5f5;
    }
    .invoice {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #3b82f6;
    }
    .company-info h1 {
      color: #3b82f6;
      font-size: 32px;
      margin-bottom: 10px;
    }
    .company-info p {
      color: #666;
      margin: 5px 0;
    }
    .invoice-info {
      text-align: left;
    }
    .invoice-info h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 10px;
    }
    .invoice-info p {
      color: #666;
      margin: 5px 0;
    }
    .section {
      margin: 30px 0;
    }
    .section-title {
      font-size: 18px;
      color: #333;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .info-box {
      padding: 15px;
      background: #f9f9f9;
      border-radius: 5px;
    }
    .info-box h3 {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }
    .info-box p {
      color: #333;
      margin: 5px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 12px;
      text-align: right;
      border-bottom: 1px solid #e5e5e5;
    }
    th {
      background: #f9f9f9;
      font-weight: bold;
      color: #333;
    }
    .totals {
      margin-top: 30px;
      text-align: left;
    }
    .totals table {
      width: 300px;
      margin-right: 0;
      margin-left: auto;
    }
    .totals td {
      padding: 8px 12px;
    }
    .totals .total-row {
      font-weight: bold;
      font-size: 18px;
      color: #3b82f6;
      border-top: 2px solid #3b82f6;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #e5e5e5;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    .status-badge {
      display: inline-block;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }
    .status-paid {
      background: #dcfce7;
      color: #166534;
    }
    .status-pending {
      background: #fef3c7;
      color: #92400e;
    }
  </style>
</head>
<body>
  <div class="invoice">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        <h1>Fixate</h1>
        <p>${data.companyAddress}</p>
        <p>الهاتف: ${data.companyPhone}</p>
        <p>البريد: ${data.companyEmail}</p>
        ${data.companyTaxId ? `<p>الرقم الضريبي: ${data.companyTaxId}</p>` : ''}
      </div>
      <div class="invoice-info">
        <h2>فاتورة</h2>
        <p><strong>رقم الفاتورة:</strong> ${data.invoiceNumber}</p>
        <p><strong>تاريخ الإصدار:</strong> ${new Date(data.invoiceDate).toLocaleDateString('ar-SA')}</p>
        ${data.paymentDate ? `<p><strong>تاريخ الدفع:</strong> ${new Date(data.paymentDate).toLocaleDateString('ar-SA')}</p>` : ''}
        <p><span class="status-badge status-${data.paymentStatus === 'paid' ? 'paid' : 'pending'}">${data.paymentStatus === 'paid' ? 'مدفوعة' : 'قيد الانتظار'}</span></p>
      </div>
    </div>

    <!-- Customer Info -->
    <div class="section">
      <h3 class="section-title">معلومات العميل</h3>
      <div class="info-box">
        <p><strong>الاسم:</strong> ${data.customerName}</p>
        <p><strong>البريد الإلكتروني:</strong> ${data.customerEmail}</p>
        <p><strong>الهاتف:</strong> ${data.customerPhone}</p>
        <p><strong>العنوان:</strong> ${data.customerAddress}</p>
      </div>
    </div>

    <!-- Service Details -->
    <div class="section">
      <h3 class="section-title">تفاصيل الخدمة</h3>
      <table>
        <thead>
          <tr>
            <th>الوصف</th>
            <th>الجهاز</th>
            <th>نوع الخدمة</th>
            <th>المبلغ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${data.serviceDescription}</td>
            <td>${data.deviceModel}</td>
            <td>${data.serviceType}</td>
            <td>${data.subtotal.toFixed(2)} ريال</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Totals -->
    <div class="totals">
      <table>
        <tr>
          <td>المجموع الفرعي:</td>
          <td>${data.subtotal.toFixed(2)} ريال</td>
        </tr>
        ${data.discount > 0 ? `
        <tr>
          <td>الخصم:</td>
          <td>-${data.discount.toFixed(2)} ريال</td>
        </tr>
        ` : ''}
        ${data.tax > 0 ? `
        <tr>
          <td>ضريبة القيمة المضافة (${((data.tax / data.subtotal) * 100).toFixed(0)}%):</td>
          <td>${data.tax.toFixed(2)} ريال</td>
        </tr>
        ` : ''}
        <tr class="total-row">
          <td>المجموع الإجمالي:</td>
          <td>${data.total.toFixed(2)} ريال</td>
        </tr>
      </table>
    </div>

    <!-- Payment Info -->
    <div class="section">
      <h3 class="section-title">معلومات الدفع</h3>
      <div class="info-box">
        <p><strong>طريقة الدفع:</strong> ${data.paymentMethod}</p>
        <p><strong>حالة الدفع:</strong> ${data.paymentStatus === 'paid' ? 'مدفوعة' : 'قيد الانتظار'}</p>
      </div>
    </div>

    ${data.notes ? `
    <div class="section">
      <h3 class="section-title">ملاحظات</h3>
      <p>${data.notes}</p>
    </div>
    ` : ''}

    <!-- Footer -->
    <div class="footer">
      <p>شكراً لاختياركم Fixate لخدمات الصيانة</p>
      <p>هذه فاتورة إلكترونية ولا تحتاج إلى ختم أو توقيع</p>
    </div>
  </div>
</body>
</html>
  `;

  // In production, use a library like puppeteer or weasyprint to convert HTML to PDF
  // For now, return the HTML as a buffer
  return Buffer.from(htmlContent, 'utf-8');
}

/**
 * Send invoice via email
 * In production, integrate with email service
 */
export async function sendInvoiceEmail(
  recipientEmail: string,
  invoiceBuffer: Buffer,
  invoiceNumber: string
): Promise<boolean> {
  try {
    console.log(`[Invoice] Sending invoice ${invoiceNumber} to ${recipientEmail}`);
    
    // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
    // await emailService.send({
    //   to: recipientEmail,
    //   subject: `فاتورة ${invoiceNumber} - Fixate`,
    //   html: `<p>مرفق فاتورتك من Fixate</p>`,
    //   attachments: [{
    //     filename: `invoice-${invoiceNumber}.pdf`,
    //     content: invoiceBuffer,
    //   }],
    // });

    return true;
  } catch (error) {
    console.error(`[Invoice] Failed to send email:`, error);
    return false;
  }
}
