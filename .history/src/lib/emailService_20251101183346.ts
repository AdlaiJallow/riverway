// Email service for sending reservation notifications

interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  orderType: 'delivery' | 'pickup';
  selectedMenuItems: string[];
  specialRequests: string;
}

export const sendReservationEmail = async (orderData: OrderData, totalAmount: number, selectedItemsWithPrices: Array<{name: string, price: number}>): Promise<boolean> => {
  const businessEmail = 'adlaijallow@gmail.com';
  
  const orderTypeText = orderData.orderType === 'delivery' ? 'Delivery' : 'Pickup';
  
  const subject = `🍽️ New Riverway Order - ${orderData.name}`;
  
  const itemsText = selectedItemsWithPrices.length > 0 
    ? selectedItemsWithPrices.map(item => `${item.name} - D${item.price}`).join('\n') 
    : 'No items selected';

  const emailBody = `
NEW ORDER REQUEST FOR RIVERWAY RESTAURANT
========================================

📞 URGENT: Please contact customer to confirm and prepare order!

CUSTOMER INFORMATION:
👤 Name: ${orderData.name}
📧 Email: ${orderData.email}
📱 Phone: ${orderData.phone}

ORDER DETAILS:
� Type: ${orderTypeText}
� ${orderData.orderType === 'delivery' ? `Address: ${orderData.address}` : 'Pickup Location: Brusubi Phase 2, Opposite Police Station'}

🍽️ ITEMS ORDERED:
${itemsText}

💰 TOTAL AMOUNT: D${totalAmount}
💬 Special Requests: ${orderData.specialRequests || 'None'}

NEXT STEPS:
1. Call the customer to confirm order
2. Prepare the ordered items
3. ${orderData.orderType === 'delivery' ? 'Arrange delivery to provided address' : 'Notify customer when ready for pickup'}
4. Collect payment on ${orderData.orderType === 'delivery' ? 'delivery' : 'pickup'}

Contact Numbers: +220 3939528 / +220 9957606
Restaurant Location: Brusubi Phase 2, Opposite Police Station

This order was submitted through the Riverway website.
  `.trim();

  try {
    // Method 1: Create mailto link (works immediately)
    const mailtoSubject = encodeURIComponent(subject);
    const mailtoBody = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:${businessEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    // Method 2: Also try to use Web Share API if available
    if ('share' in navigator) {
      try {
        await navigator.share({
          title: subject,
          text: emailBody,
        });
      } catch (shareError) {
        console.log('Share API not used:', shareError);
      }
    }

    // Method 3: Copy to clipboard as backup
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${emailBody}`);
      console.log('Reservation details copied to clipboard as backup');
    } catch (clipboardError) {
      console.log('Clipboard copy failed:', clipboardError);
    }

    return true;
  } catch (error) {
    console.error('Email service failed:', error);
    return false;
  }
};

// Alternative: WhatsApp message (popular in The Gambia)
export const sendWhatsAppNotification = (orderData: OrderData, totalAmount: number, selectedItemsWithPrices: Array<{name: string, price: number}>): void => {
  const phoneNumber = '2203939528'; // Your business WhatsApp number (without +)
  
  const orderTypeText = orderData.orderType === 'delivery' ? 'Delivery' : 'Pickup';
  
  // Format selected items with prices
  const itemsText = selectedItemsWithPrices.length > 0 
    ? selectedItemsWithPrices.map(item => `${item.name} - D${item.price}`).join('\n')
    : 'No items selected';

  const message = `
🍽️ NEW RIVERWAY ORDER

Customer: ${orderData.name}
Order Type: ${orderTypeText}
${orderData.orderType === 'delivery' ? `Address: ${orderData.address}` : 'Pickup Location: Brusubi Phase 2, Opposite Police Station'}

ITEMS ORDERED:
${itemsText}

TOTAL AMOUNT: D${totalAmount}

Special Requests: ${orderData.specialRequests || 'None'}

Please confirm this order!
  `.trim();

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};