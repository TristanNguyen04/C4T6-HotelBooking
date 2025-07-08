function Payment() {
  const handleCheckout = async () => {
    const response = await fetch("http://localhost:3000/paymentintent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      alert("Failed to redirect to checkout");
    }
  };

  return (
    <nav>
      <div>Hello Pay Now</div>
      <button id="checkout-button" onClick={handleCheckout}>
        Checkout
      </button>
    </nav>
  );
}

export default Payment;