// WhatsApp notification service for orders// WhatsApp notification service for orders// Email service for sending reservation notifications



interface OrderData {

  name: string;

  email: string;interface OrderData {interface OrderData {

  phone: string;

  address: string;  name: string;  name: string;

  orderType: 'delivery' | 'pickup';

  selectedMenuItems: string[];  email: string;  email: string;

  specialRequests: string;

}  phone: string;  phone: string;



// Placeholder function to maintain compatibility (email removed)  address: string;  address: string;

export const sendReservationEmail = async (orderData: OrderData, totalAmount: number, selectedItemsWithPrices: Array<{name: string, price: number}>): Promise<boolean> => {

  // Email functionality removed - using WhatsApp only  orderType: 'delivery' | 'pickup';  orderType: 'delivery' | 'pickup';

  console.log('Email functionality has been removed. Using WhatsApp notification instead.');

  return true;  selectedMenuItems: string[];  selectedMenuItems: string[];

};

  specialRequests: string;  specialRequests: string;

// WhatsApp message (popular in The Gambia)

export const sendWhatsAppNotification = (orderData: OrderData, totalAmount: number, selectedItemsWithPrices: Array<{name: string, price: number}>): void => {}}

  const phoneNumber = '2203939528'; // Your business WhatsApp number (without +)

  

  const orderTypeText = orderData.orderType === 'delivery' ? 'Delivery' : 'Pickup';

  // Placeholder function to maintain compatibility (email removed)// Email function removed - using WhatsApp only

  // Format selected items with prices

  const itemsText = selectedItemsWithPrices.length > 0 export const sendReservationEmail = async (orderData: OrderData, totalAmount: number, selectedItemsWithPrices: Array<{name: string, price: number}>): Promise<boolean> => {export const sendReservationEmail = async (orderData: OrderData, totalAmount: number, selectedItemsWithPrices: Array<{name: string, price: number}>): Promise<boolean> => {

    ? selectedItemsWithPrices.map(item => `${item.name} - D${item.price}`).join('\n')

    : 'No items selected';  // Email functionality removed - using WhatsApp only  // Email functionality removed - returning true to maintain compatibility



  const message = `  console.log('Email functionality has been removed. Using WhatsApp notification instead.');  return true;

🍽️ NEW RIVERWAY ORDER

  return true;};

Customer: ${orderData.name}

Order Type: ${orderTypeText}};

${orderData.orderType === 'delivery' ? `Address: ${orderData.address}` : 'Pickup Location: Brusubi Phase 2, Opposite Police Station'}

// WhatsApp message (popular in The Gambia)

ITEMS ORDERED:

${itemsText}// WhatsApp message (popular in The Gambia)NEW ORDER REQUEST FOR RIVERWAY RESTAURANT



TOTAL AMOUNT: D${totalAmount}export const sendWhatsAppNotification = (orderData: OrderData, totalAmount: number, selectedItemsWithPrices: Array<{name: string, price: number}>): void => {========================================



Special Requests: ${orderData.specialRequests || 'None'}  const phoneNumber = '2203939528'; // Your business WhatsApp number (without +)



Please confirm this order!  📞 URGENT: Please contact customer to confirm and prepare order!

  `.trim();

  const orderTypeText = orderData.orderType === 'delivery' ? 'Delivery' : 'Pickup';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');  CUSTOMER INFORMATION:

};
  // Format selected items with prices👤 Name: ${orderData.name}

  const itemsText = selectedItemsWithPrices.length > 0 📧 Email: ${orderData.email}

    ? selectedItemsWithPrices.map(item => `${item.name} - D${item.price}`).join('\n')📱 Phone: ${orderData.phone}

    : 'No items selected';

ORDER DETAILS:

  const message = `� Type: ${orderTypeText}

🍽️ NEW RIVERWAY ORDER� ${orderData.orderType === 'delivery' ? `Address: ${orderData.address}` : 'Pickup Location: Brusubi Phase 2, Opposite Police Station'}



Customer: ${orderData.name}🍽️ ITEMS ORDERED:

Order Type: ${orderTypeText}${itemsText}

${orderData.orderType === 'delivery' ? `Address: ${orderData.address}` : 'Pickup Location: Brusubi Phase 2, Opposite Police Station'}

💰 TOTAL AMOUNT: D${totalAmount}

ITEMS ORDERED:💬 Special Requests: ${orderData.specialRequests || 'None'}

${itemsText}

NEXT STEPS:

TOTAL AMOUNT: D${totalAmount}1. Call the customer to confirm order

2. Prepare the ordered items

Special Requests: ${orderData.specialRequests || 'None'}3. ${orderData.orderType === 'delivery' ? 'Arrange delivery to provided address' : 'Notify customer when ready for pickup'}

4. Collect payment on ${orderData.orderType === 'delivery' ? 'delivery' : 'pickup'}

Please confirm this order!

  `.trim();Contact Numbers: +220 3939528 / +220 9957606

Restaurant Location: Brusubi Phase 2, Opposite Police Station

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');This order was submitted through the Riverway website.

};  `.trim();

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