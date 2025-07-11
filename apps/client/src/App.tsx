import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';

function App(){
  return (
    <Routes>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/verify-email' element={<EmailVerificationPage/>}/>
      <Route path='/search' element={<SearchResultsPage/>}/>
      <Route path='/hotels/:id/details' element={<HotelDetailsPage/>}/>
    </Routes>
  );
}

export default App
