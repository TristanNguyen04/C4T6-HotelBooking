import { useEffect } from "react";

function PaymentSuccess() {
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (sessionId) {
      console.log(" Sending sessionId to backend:", sessionId);

      fetch("http://localhost:3000/payment/success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(" Booking created:", data);
        })
        .catch(err => {
          console.error(" Error confirming payment:", err);
        });
    }
  }, []);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your booking has been confirmed.</p>
    </div>
  );
}

export default PaymentSuccess;
