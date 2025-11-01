// Email service for sending reservation notifications

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  selectedMenuItems: string[];
  specialRequests: string;
}

export const sendReservationEmail = async (reservationData: ReservationData): Promise<boolean> => {
  const businessEmail = 'adlaijallow@gmail.com';
  
  // Format the date and time for better readability
  const formattedDate = new Date(reservationData.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = new Date(`1970-01-01T${reservationData.time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const subject = `🍽️ New Riverway Reservation - ${reservationData.name}`;
  
  const selectedItems = reservationData.selectedMenuItems.length > 0 
    ? reservationData.selectedMenuItems.join(', ') 
    : 'No specific items selected - customer will order at restaurant';

  const emailBody = `
NEW RESERVATION REQUEST FOR RIVERWAY RESTAURANT
=============================================

📞 URGENT: Please contact customer within 24 hours to confirm!

CUSTOMER INFORMATION:
👤 Name: ${reservationData.name}
📧 Email: ${reservationData.email}
📱 Phone: ${reservationData.phone}

RESERVATION DETAILS:
📅 Date: ${formattedDate}
🕒 Time: ${formattedTime}
🍽️ Pre-Selected Menu Items: ${selectedItems}
💬 Special Requests: ${reservationData.specialRequests || 'None'}

NEXT STEPS:
1. Call the customer to confirm availability
2. Prepare the pre-selected dishes or discuss menu options
3. Confirm any dietary requirements or modifications
4. Send confirmation details to customer

Contact Numbers: +220 3939528 / +220 9957606
Restaurant Location: Brusubi Phase 2, Opposite Police Station

This reservation was submitted through the Riverway website.
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
export const sendWhatsAppNotification = (reservationData: ReservationData): void => {
  const phoneNumber = '2203939528'; // Your business WhatsApp number (without +)
  
  const formattedDate = new Date(reservationData.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = new Date(`1970-01-01T${reservationData.time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const message = `
🍽️ NEW RIVERWAY RESERVATION

Customer: ${reservationData.name}
Phone: ${reservationData.phone}
Email: ${reservationData.email}

Date: ${formattedDate}
Time: ${formattedTime}
Party: ${reservationData.partySize} people

Special Requests: ${reservationData.specialRequests || 'None'}

Please confirm this reservation!
  `.trim();

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};