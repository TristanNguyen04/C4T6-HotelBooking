function Payment() {
  const handleCheckout = async () => {
    // used for testing checkout page with post requests from confirmation page
    const hotel_cart = [
      {
        hotelId: "hotel1",
        hotelName: "Marina Bay Sands",
        checkin: "2025-05-05",
        checkout: "2025-05-11",
        guests: 2,
        name: "Marina Bay Sands - 6D5N - 05/05 to 11/05",
        currency: "sgd",
        price: 1200000,
        quantity: 1,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgw1QcpVM_ETgHLuSxL9GMVLXULvNq4ePDg&s"
      },
      {
        hotelId: "hotel2",
        hotelName: "OceanView Hotel",
        checkin: "2025-04-27",
        checkout: "2025-05-02",
        guests: 1,
        name: "OceanView Hotel - 5D4N - 27/04 to 02/05",
        currency: "sgd",
        price: 100000,
        quantity: 1,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgw1QcpVM_ETgHLuSxL9GMVLXULvNq4ePDg&s"
      }
    ]
    const userId = "currentUserId123";
    const booking = {};

    const response = await fetch("http://localhost:3000/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: hotel_cart, userId, booking }),
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