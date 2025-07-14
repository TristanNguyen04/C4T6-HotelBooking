import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import Layout from './layouts/Layout';
import SearchBar from './components/SearchBar';
import { useNavigate } from 'react-router-dom';

function App(){
  const location = useLocation();
  const navigate = useNavigate();

  const noLayoutPaths = ['/login', '/register', '/verify-email'];
  const shouldUseLayout = !noLayoutPaths.includes(location.pathname);

  // Handle search submit for hero SearchBar
  const handleSearchSubmit = ({ destination, checkin, checkout, guests }: {
    destination: { uid: string; term: string };
    checkin: string;
    checkout: string;
    guests: string;
  }) => {
    navigate(
      `/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`
    );
  };

  if (!shouldUseLayout) {
    return (
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/verify-email' element={<EmailVerificationPage/>}/>
      </Routes>
    );
  }

  // Determine if current route should show hero
  const isHomePage = location.pathname === '/';
  const heroContent = isHomePage ? <SearchBar onSubmit={handleSearchSubmit} /> : undefined;

  return (
    <Layout showHero={isHomePage} heroContent={heroContent}>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search' element={<SearchResultsPage/>}/>
        <Route path='/hotels/:id/details' element={<HotelDetailsPage/>}/>
      </Routes>
    </Layout>
  );
}

export default App
