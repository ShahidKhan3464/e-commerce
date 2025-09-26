import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function downloadInvoice(order, isAdmin = false) {
  console.log(order);
  const doc = new jsPDF();

  // --- HEADER ---
  doc.setFontSize(18);
  doc.text('MyShop', 10, 15);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text('Invoice', 10, 28);
  doc.text(`Order ID: #${order._id.slice(-6)}`, 10, 36);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 10, 44);

  // --- CUSTOMER INFO (Only for Admin) ---
  if (isAdmin) {
    doc.setFontSize(13);
    doc.setTextColor(0);
    doc.text('Customer Details', 120, 60); // right column
    doc.setFontSize(11);
    doc.setTextColor(80);
    doc.text(
      `${order.user.name}
      ${order.user.email}`,
      120,
      68
    );
  }

  // --- SHIPPING INFO ---
  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.text('Shipping Address', 10, 60);
  doc.setFontSize(11);
  doc.setTextColor(80);
  const address = order.shippingAddress;
  doc.text(
    `${address.fullName}
    ${address.address}
    ${address.city}, ${address.country} - ${address.postalCode}`,
    10,
    68
  );

  // --- PRODUCTS TABLE ---
  const tableColumn = ['Product', 'Category', 'Qty', 'Price', 'Total'];
  const tableRows = order.products.map((p) => [
    p.name,
    p.category,
    p.quantity,
    `$${p.price.toFixed(2)}`,
    `$${(p.price * p.quantity).toFixed(2)}`
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 100,
    theme: 'striped',
    styles: { fontSize: 11 },
    margin: { left: 10, right: 10 },
    headStyles: { fillColor: [22, 122, 199] }
  });

  // --- ORDER SUMMARY ---
  let finalY = doc.lastAutoTable.finalY + 20;
  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.text('Order Summary', 10, finalY);

  doc.setFontSize(11);
  doc.setTextColor(80);
  finalY += 10;
  doc.text(
    `Payment Status: ${
      order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)
    }`,
    10,
    finalY
  );
  finalY += 8;
  doc.text(
    `Order Status: ${
      order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)
    }`,
    10,
    finalY
  );

  // Total price aligned right
  doc.setFontSize(14);
  doc.setTextColor(20);
  doc.text(
    `Total: $${order.totalPrice.toFixed(2)}`,
    doc.internal.pageSize.getWidth() - 10,
    finalY,
    { align: 'right' }
  );

  // --- FOOTER ---
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text(
    'Thank you for shopping with MyShop!',
    doc.internal.pageSize.getWidth() / 2,
    pageHeight - 10,
    { align: 'center' }
  );

  // --- SAVE FILE ---
  doc.save(`invoice-${order._id}.pdf`);
}
