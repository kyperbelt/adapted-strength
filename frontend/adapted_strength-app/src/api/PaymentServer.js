// Add an endpoint to fetch the Checkout Session status
app.get('/session_status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
  
    res.send({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: customer.email
    });
  });