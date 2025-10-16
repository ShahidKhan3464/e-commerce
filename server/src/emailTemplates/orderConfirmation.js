export const orderConfirmationTemplate = (order, user) => {
  const productsHtml = order.products.map(product => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
        ${product.name}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${product.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${product.price.toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
        <h1 style="color: #28a745; text-align: center; margin-bottom: 30px;">Order Confirmed!</h1>
        
        <p>Dear ${user.name},</p>
        <p>Thank you for your order! We're excited to confirm that we've received your order and it's being processed.</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #495057; border-bottom: 2px solid #28a745; padding-bottom: 10px;">Order Details</h2>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">${order.orderStatus.toUpperCase()}</span></p>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #495057;">Items Ordered:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">Product</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #dee2e6;">Quantity</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #dee2e6;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${productsHtml}
            </tbody>
          </table>
          <div style="text-align: right; margin-top: 20px; padding-top: 20px; border-top: 2px solid #28a745;">
            <h3 style="color: #28a745;">Total: $${order.totalPrice.toFixed(2)}</h3>
          </div>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #495057;">Shipping Address:</h3>
          <p>${order.shippingAddress.fullName}<br>
          ${order.shippingAddress.address}<br>
          ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
          ${order.shippingAddress.country}</p>
        </div>

        <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>What's Next?</strong></p>
          <p style="margin: 5px 0 0 0;">We'll send you another email when your order ships with tracking information.</p>
        </div>

        <p style="text-align: center; margin-top: 30px;">
          Thank you for choosing us!<br>
          <strong>The E-Commerce Team</strong>
        </p>
      </div>
    </body>
    </html>
  `;
};