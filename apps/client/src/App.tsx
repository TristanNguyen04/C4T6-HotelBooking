import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './pages/PaymentTest';
import PaymentSuccess from './pages/PaymentSuccessTest';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
