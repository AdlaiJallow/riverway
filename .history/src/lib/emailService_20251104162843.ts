// WhatsApp notification service for orders

interface OrderData {
  name: string;
  phone: string;
  address: string;
  orderType: 'delivery' | 'pickup';
  selectedMenuItems: string[];
  menuQuantities: Record<string, number>;
  specialRequests: string;
}

// Placeholder function to maintain compatibility (email removed)
export const sendReservationEmail = async (orderData: OrderData, totalAmount: number, selectedItemsWithPrices: Array<{name: string, price: number, quantity?: number}>): Promise<boolean> => {
  // Email functionality removed - using WhatsApp only
  console.log('Email functionality has been removed. Using WhatsApp notification instead.');
  return true;
};

// WhatsApp call for direct order placement (popular in The Gambia)
export const sendWhatsAppNotification = (orderData: OrderData, totalAmount: number, selectedItemsWithPrices: Array<{name: string, price: number, quantity?: number}>): void => {
  const phoneNumber = '2203939528'; // Your business WhatsApp number (without +)
  
  // Initiate WhatsApp call directly for order placement
  const whatsappCallUrl = `https://wa.me/${phoneNumber}`;
  window.open(whatsappCallUrl, '_blank');
  
  // Optional: Store order details in localStorage for customer reference
  const orderSummary = {
    customer: orderData.name,
    phone: orderData.phone,
    orderType: orderData.orderType,
    address: orderData.orderType === 'delivery' ? orderData.address : 'Pickup at Brusubi Phase 2, Opposite Police Station',
    items: selectedItemsWithPrices.map(item => ({
      name: item.name,
      quantity: item.quantity || 1,
      total: item.price * (item.quantity || 1)
    })),
    totalAmount,
    specialRequests: orderData.specialRequests || 'None',
    timestamp: new Date().toLocaleString()
  };
  
  localStorage.setItem('lastOrder', JSON.stringify(orderSummary));
  console.log('Order details stored for reference:', orderSummary);
};

// Alternative function for customers who prefer to send order details via WhatsApp message
export const sendWhatsAppMessage = (orderData: OrderData, totalAmount: number, selectedItemsWithPrices: Array<{name: string, price: number, quantity?: number}>): void => {
  const phoneNumber = '2203939528'; // Your business WhatsApp number (without +)
  
  const orderTypeText = orderData.orderType === 'delivery' ? 'Delivery' : 'Pickup';
  
  // Format selected items with quantities and prices
  const itemsText = selectedItemsWithPrices.length > 0 
    ? selectedItemsWithPrices.map(item => {
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;
        return `${item.name} ${quantity > 1 ? `(x${quantity})` : ''} - D${itemTotal}`;
      }).join('\n')
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
