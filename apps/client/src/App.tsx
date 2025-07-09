import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './pages/PaymentTest';
import HomePage from './pages/HomePage';
import './styles/index.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
