export const orderStatusUpdateTemplate = (order, user, previousStatus) => {
  const statusColors = {
    pending: '#ffc107',
    shipped: '#17a2b8',
    delivered: '#28a745',
    cancelled: '#dc3545'
  };

  const statusMessages = {
    pending: 'Your order is being processed',
    shipped: 'Your order has been shipped!',
    delivered: 'Your order has been delivered!',
    cancelled: 'Your order has been cancelled'
  };

  const statusDescriptions = {
    pending: 'We are preparing your order for shipment.',
    shipped: 'Your order is on its way! You should receive it within 3-5 business days.',
    delivered: 'Your order has been successfully delivered. We hope you enjoy your purchase!',
    cancelled: 'Your order has been cancelled. If you have any questions, please contact our support team.'
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Status Update</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
        <h1 style="color: ${statusColors[order.orderStatus]}; text-align: center; margin-bottom: 30px;">Order Status Update</h1>
        
        <p>Dear ${user.name},</p>
        <p>We wanted to update you on the status of your recent order.</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${statusColors[order.orderStatus]};">
          <h2 style="color: ${statusColors[order.orderStatus]}; margin-top: 0;">${statusMessages[order.orderStatus]}</h2>
          <p>${statusDescriptions[order.orderStatus]}</p>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #495057; border-bottom: 2px solid ${statusColors[order.orderStatus]}; padding-bottom: 10px;">Order Details</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Previous Status:</strong> <span style="color: #6c757d;">${previousStatus?.toUpperCase() || 'N/A'}</span></p>
          <p><strong>Current Status:</strong> <span style="color: ${statusColors[order.orderStatus]}; font-weight: bold;">${order.orderStatus.toUpperCase()}</span></p>
          <p><strong>Total Amount:</strong> $${order.totalPrice.toFixed(2)}</p>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #495057;">Shipping Address:</h3>
          <p>${order.shippingAddress.fullName}<br>
          ${order.shippingAddress.address}<br>
          ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
          ${order.shippingAddress.country}</p>
        </div>

        ${order.orderStatus === 'shipped' ? `
        <div style="background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #bee5eb;">
          <p style="margin: 0;"><strong>Tracking Information:</strong></p>
          <p style="margin: 5px 0 0 0;">Your package is on its way! You can track your order status in your account dashboard.</p>
        </div>
        ` : ''}

        ${order.orderStatus === 'delivered' ? `
        <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #c3e6cb;">
          <p style="margin: 0;"><strong>Enjoy your purchase!</strong></p>
          <p style="margin: 5px 0 0 0;">We'd love to hear about your experience. Consider leaving a review!</p>
        </div>
        ` : ''}

        <p style="text-align: center; margin-top: 30px;">
          If you have any questions, please don't hesitate to contact us.<br>
          <strong>The E-Commerce Team</strong>
        </p>
      </div>
    </body>
    </html>
  `;
};