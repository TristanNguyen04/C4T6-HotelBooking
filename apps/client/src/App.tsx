import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import Layout from './layouts/Layout';
import SearchBar from './components/SearchBar';
import { useNavigate } from 'react-router-dom';
import Map from '../src/pages/GoogleMap'

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
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/verify-email' element={<EmailVerificationPage/>}/>
      <Route path='/map' element={<Map/>}/>
      
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
    </Routes>
  );
}

export default App
