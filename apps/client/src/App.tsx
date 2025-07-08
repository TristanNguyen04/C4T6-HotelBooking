import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './pages/PaymentTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
