import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './layouts/Layout';
import SearchBar from './components/SearchBar';
import { useNavigate } from 'react-router-dom';
import Map from '../src/pages/GoogleMap'
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingHistoryPage from './pages/BookingHistoryPage';

function App(){
  const navigate = useNavigate();

  // Handle SearchBar at Home Page
  const handleSearchSubmit = ({ destination, checkin, checkout, guests, rooms, adults, children }: {
    destination: { uid: string; term: string };
    checkin: string;
    checkout: string;
    guests: string;
    rooms: number;
    adults: number;
    children: number
  }) => {
    navigate(
      `/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}&adults=${adults}&children=${children}&rooms=${rooms}
    `);
  };

  return (
    <Routes>
      {/* Routes without layout */}
      <Route path='/map' element={<Map/>}/>
      <Route path='/paymentSuccess' element={<PaymentSuccessPage/>}/>

      {/* Routes with layout */}
      <Route path='/' element={
        <Layout showHero={true} heroContent={<SearchBar onSubmit={handleSearchSubmit} />}>
          <HomePage/>
        </Layout>
      }/>
      <Route path='/search' element={
        <Layout showHero={false}>
          <SearchResultsPage/>
        </Layout>
      }/>
      <Route path='/hotels/:id/details' element={
        <Layout showHero={false}>
          <HotelDetailsPage/>
        </Layout>
      }/>

      <Route path='/checkout' element={
        <Layout showHero={false}>
          <CheckoutPage/>
        </Layout>
      }/>
      <Route path='/profile' element={
        <Layout showHero={false}>
          <ProfilePage/>
        </Layout>
      }/>
      <Route path='/login' element={
        <Layout showNavBar={true} showHero={false}>
          <LoginPage/>
        </Layout>
      }/>
      <Route path='/register' element={
        <Layout showNavBar={true} showHero={false}>
          <RegisterPage/>
        </Layout>
      }/>
      <Route path='/bookings' element={
        <Layout showHero={false}>
          <BookingHistoryPage/>
        </Layout>
      }/>
    </Routes>
  );
}

export default App
