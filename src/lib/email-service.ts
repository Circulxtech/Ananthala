import nodemailer from "nodemailer"
import type { Order } from "@/types/index"

const getEmailTransporter = () => {
  // Check if using Gmail (most common)
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }

  // Fallback to SMTP configuration
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD
  ) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  // Fallback to test account if no credentials provided
  console.warn("[v0] No email credentials configured. Using test account.")
  return nodemailer.createTestAccount().then((testAccount) => {
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
  })
}

export async function sendOrderConfirmationEmail(
  order: Partial<Order> & {
    customerEmail: string
    customerName: string
    orderId: string
    items: Array<{
      productName: string
      quantity: number
      price: number
      size?: string
      fabric?: string
      productColor?: string
    }>
    subtotal: number
    discount: number
    shippingCost: number
    totalAmount: number
  },
): Promise<boolean> {
  try {
    const transporter = await getEmailTransporter()

    // Build items table HTML
    const itemsHTML = order.items
      .map(
        (item: { productName: any; size: any; fabric: any; productColor: any; quantity: number; price: number }) => `
      <tr>
        <td>
          <div class="item-name">${item.productName}</div>
          ${
            item.size || item.fabric || item.productColor
              ? `<div class="item-specs">
              ${[item.size, item.fabric, item.productColor].filter(Boolean).join(" • ")}
            </div>`
              : ""
          }
        </td>
        <td style="text-align: center;">${item.quantity}</td>
        <td class="text-right">₹${item.price.toFixed(2)}</td>
        <td class="text-right font-medium">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `,
      )
      .join("")

    const trackOrderUrl = `${process.env.NEXT_PUBLIC_APP_URL }/track-order`

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Ananthala</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.5;
          color: #4a4a4a;
          background-color: #f9f7f4;
          padding: 16px;
        }
        .wrapper {
          max-width: 600px;
          margin: 0 auto;
        }
        .container {
          background-color: #ffffff;
          border: 1px solid #e8ddd5;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        /* Header Section */
        .header {
          background: linear-gradient(135deg, #6d4530 0%, #8b5a3c 100%);
          color: white;
          padding: 32px 24px;
          text-align: center;
        }
        .header-logo {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .header-subtitle {
          font-size: 13px;
          opacity: 0.9;
          letter-spacing: 0.3px;
        }
        
        /* Main Content */
        .content {
          padding: 32px 24px;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #6d4530;
          margin-bottom: 6px;
        }
        .intro-text {
          color: #8b5a3c;
          font-size: 14px;
          margin-bottom: 24px;
          line-height: 1.6;
        }
        
        /* Order Info Grid */
        .order-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          margin-bottom: 28px;
        }
        .order-card {
          background: linear-gradient(135deg, #fafaf8 0%, #f5f1ed 100%);
          border: 1px solid #e8ddd5;
          border-radius: 8px;
          padding: 14px;
          text-align: center;
        }
        .order-card-label {
          color: #8b5a3c;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 6px;
        }
        .order-card-value {
          color: #6d4530;
          font-size: 14px;
          font-weight: 600;
          word-break: break-all;
        }
        
        /* Items Section */
        .items-header {
          font-size: 14px;
          font-weight: 700;
          color: #6d4530;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 13px;
        }
        .items-table thead tr {
          background: linear-gradient(135deg, #eed9c4 0%, #e6cbb9 100%);
          border: none;
        }
        .items-table th {
          padding: 10px 12px;
          text-align: left;
          font-weight: 600;
          color: #6d4530;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.2px;
        }
        .items-table td {
          padding: 10px 12px;
          border-bottom: 1px solid #ede9e3;
          color: #6d4530;
        }
        .items-table tr:last-child td {
          border-bottom: none;
        }
        .item-name {
          font-weight: 600;
          margin-bottom: 3px;
        }
        .item-specs {
          color: #8b5a3c;
          font-size: 11px;
          margin-top: 3px;
        }
        .text-right {
          text-align: right;
        }
        .font-medium {
          font-weight: 600;
        }
        
        /* Summary Section */
        .summary-box {
          background: linear-gradient(135deg, #fafaf8 0%, #f5f1ed 100%);
          border: 1px solid #e8ddd5;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          font-size: 13px;
          color: #6d4530;
        }
        .summary-row.discount {
          color: #28a745;
          font-weight: 600;
        }
        .summary-row.total {
          border-top: 2px solid #d9cfc7;
          border-bottom: 2px solid #d9cfc7;
          padding: 12px 0;
          font-size: 15px;
          font-weight: 700;
          color: #6d4530;
        }
        .summary-label {
          color: #8b5a3c;
          font-weight: 500;
        }
        .summary-row.total .summary-label {
          color: #6d4530;
        }
        
        /* CTA Button */
        .button-container {
          text-align: center;
          margin: 24px 0;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #6d4530 0%, #5a3a26 100%);
          color: white;
          padding: 12px 32px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.2px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(109, 69, 48, 0.2);
        }
        .cta-button:hover {
          background: linear-gradient(135deg, #5a3a26 0%, #4a2a1a 100%);
          box-shadow: 0 4px 8px rgba(109, 69, 48, 0.3);
        }
        
        /* Next Steps */
        .next-steps {
          background: linear-gradient(135deg, #fafaf8 0%, #f5f1ed 100%);
          border-left: 4px solid #6d4530;
          border-radius: 6px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .next-steps-title {
          font-weight: 600;
          color: #6d4530;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin-bottom: 10px;
        }
        .next-steps-list {
          list-style: none;
          font-size: 13px;
          color: #8b5a3c;
          line-height: 1.8;
        }
        .next-steps-list li {
          margin-bottom: 6px;
          padding-left: 20px;
          position: relative;
        }
        .next-steps-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #6d4530;
          font-weight: bold;
        }
        
        /* Address Section */
        .address-box {
          background: linear-gradient(135deg, #fafaf8 0%, #f5f1ed 100%);
          border: 1px solid #e8ddd5;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .address-title {
          font-weight: 600;
          color: #6d4530;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin-bottom: 10px;
        }
        .address-content {
          color: #8b5a3c;
          font-size: 13px;
          line-height: 1.8;
        }
        
        /* Footer */
        .footer {
          background-color: #f5f1ed;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #e8ddd5;
        }
        .footer-text {
          color: #8b5a3c;
          font-size: 12px;
          margin-bottom: 12px;
          line-height: 1.6;
        }
        .contact-info {
          font-size: 12px;
          color: #6d4530;
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .contact-info strong {
          color: #6d4530;
          font-weight: 600;
        }
        .footer-links {
          margin: 16px 0;
        }
        .footer-link {
          color: #6d4530;
          text-decoration: none;
          font-size: 12px;
          margin: 0 10px;
          font-weight: 500;
          display: inline-block;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
        .footer-bottom {
          color: #b0a595;
          font-size: 11px;
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid #e8ddd5;
        }
        
        /* Responsive */
        @media (max-width: 480px) {
          .order-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .items-table {
            font-size: 12px;
          }
          .items-table th,
          .items-table td {
            padding: 8px;
          }
          .header {
            padding: 24px 16px;
          }
          .content {
            padding: 20px 16px;
          }
          .footer {
            padding: 16px;
          }
          .greeting {
            font-size: 16px;
          }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="header-logo">🏠 Ananthala</div>
            <div class="header-subtitle">Order Confirmation</div>
          </div>

          <!-- Content -->
          <div class="content">
            <p class="greeting">Hello ${order.customerName},</p>
            <p class="intro-text">Thank you for your order! We're excited to prepare and deliver your items. Your order has been received and is now being processed.</p>

            <!-- Order Info Grid -->
            <div class="order-grid">
              <div class="order-card">
                <div class="order-card-label">Order ID</div>
                <div class="order-card-value">${order.orderId}</div>
              </div>
              <div class="order-card">
                <div class="order-card-label">Order Date</div>
                <div class="order-card-value">${new Date().toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}</div>
              </div>
              <div class="order-card">
                <div class="order-card-label">Status</div>
                <div class="order-card-value" style="color: #4a9d6f;">Processing</div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="items-header">Order Items</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th style="width: 45%;">Product</th>
                  <th style="width: 15%; text-align: center;">Qty</th>
                  <th style="width: 20%; text-align: right;">Price</th>
                  <th style="width: 20%; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <!-- Summary -->
            <div class="summary-box">
              <div class="summary-row">
                <span class="summary-label">Subtotal : </span>
                <span>₹${order.subtotal.toFixed(2)}</span>
              </div>
              ${
                order.discount > 0
                  ? `<div class="summary-row discount">
                <span class="summary-label">Discount: </span>
                <span>-₹${order.discount.toFixed(2)}</span>
              </div>`
                  : ""
              }
              <div class="summary-row">
                <span class="summary-label">Shipping : </span>
                <span>₹${order.shippingCost.toFixed(2)}</span>
              </div>
              <div class="summary-row total">
                <span class="summary-label">Total Amount : </span>
                <span>₹${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <!-- CTA Button -->
            <div class="button-container">
              <a href="${trackOrderUrl}?orderId=${order.orderId}" class="cta-button">Track Your Order</a>
            </div>

            <!-- Shipping Address -->
            <div class="address-box">
              <div class="address-title">Delivery Address</div>
              <div class="address-content">
                <strong>${order.customerName}</strong><br>
                ${order.shippingAddress?.fullAddress || "Address not provided"}<br>
                ${[order.shippingAddress?.city, order.shippingAddress?.state, order.shippingAddress?.zipCode].filter(Boolean).join(", ")}<br>
                ${order.shippingAddress?.country || ""}
              </div>
            </div>

            <!-- Next Steps -->
            <div class="next-steps">
              <div class="next-steps-title">What's Next?</div>
              <ul class="next-steps-list">
                <li>We'll confirm and process your order within 24 hours</li>
                <li>You'll receive a shipping notification with tracking details</li>
                <li>Track your order anytime using your Order ID above</li>
              </ul>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p class="footer-text">Need help? We're here for you!</p>
            <div class="contact-info">
              <strong>Email:</strong> qualprodsllp@gmail.com<br>
              <strong>Phone:</strong> +91 9071799966<br>
              <strong>Hours:</strong> Mon-Fri, 9 AM - 6 PM IST
            </div>
            <div class="footer-links">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/track-order" class="footer-link">Track Order</a>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact-us" class="footer-link">Contact Us</a>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/policy-privacy" class="footer-link">Privacy Policy</a>
            </div>
            <div class="footer-bottom">
              © 2026 Ananthala. All rights reserved.<br>
              This is an automated email. Please do not reply directly.
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || "noreply@ananthala.com",
      to: order.customerEmail,
      subject: `Order Confirmation - ${order.orderId}`,
      html: htmlContent,
      text: `
Order Confirmation

Thank you for your order, ${order.customerName}!

Order ID: ${order.orderId}
Order Date: ${new Date().toLocaleDateString("en-IN")}
Status: Processing

Items:
${order.items.map((item: { productName: any; quantity: number; price: number }) => `- ${item.productName} x${item.quantity}: ₹${(item.price * item.quantity).toFixed(2)}`).join("\n")}

Subtotal: ₹${order.subtotal.toFixed(2)}
${order.discount > 0 ? `Discount: -₹${order.discount.toFixed(2)}\n` : ""}Shipping: ₹${order.shippingCost.toFixed(2)}
Total: ₹${order.totalAmount.toFixed(2)}

Track your order here:
${trackOrderUrl}?orderId=${order.orderId}

If you have any questions, contact us at:
Email: qualprodsllp@gmail.com
Phone: +91 9071799966

Thank you for choosing Ananthala!
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log(`[v0] Order confirmation email sent to ${order.customerEmail}`)
    return true
  } catch (error) {
    console.error(`[v0] Failed to send order confirmation email: ${error}`)
    return false
  }
}
