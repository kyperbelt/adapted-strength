initialize();

async function initialize() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get('session_id');
  const response = await fetch(`/session-status?session_id=${sessionId}`);
  const session = await response.json();
// Handle the session according to its status
  if (session.status == 'open') {
    // Remount embedded Checkout
    window.location.replace('http://localhost:4242/checkout.html')
  } else if (session.status == 'complete') {
    document.getElementById('success').classList.remove('hidden');
    document.getElementById('customer-email').textContent = session.customer_email;
    // Show success page
    // Optionally use session.payment_status or session.customer_email
    // to customize the success page
  }
}