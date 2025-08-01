import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import ProfilePage from './pages/ProfilePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import Layout from './layouts/Layout';
import SearchBar from './components/SearchBar';
import { useNavigate } from 'react-router-dom';
import Map from '../src/pages/GoogleMap';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import { useAuth } from './contexts/AuthContext';
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
function App() {
    const navigate = useNavigate();
    const handleSearchSubmit = ({ destination, checkin, checkout, guests, rooms, adults, children }) => {
        navigate(`/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}&adults=${adults}&children=${children}&rooms=${rooms}`);
    };
    return (_jsxs(Routes, { children: [_jsx(Route, { path: '/map', element: _jsx(Map, {}) }), _jsx(Route, { path: '/paymentSuccess', element: _jsx(PaymentSuccessPage, {}) }), _jsx(Route, { path: '/', element: _jsx(Layout, { showHero: true, showNavBar: true, heroContent: _jsx(SearchBar, { onSubmit: handleSearchSubmit }), children: _jsx(HomePage, {}) }) }), _jsx(Route, { path: '/about', element: _jsx(Layout, { showHero: false, children: _jsx(AboutUsPage, {}) }) }), _jsx(Route, { path: '/contact', element: _jsx(Layout, { showHero: false, children: _jsx(ContactPage, {}) }) }), _jsx(Route, { path: '/search', element: _jsx(Layout, { showHero: false, children: _jsx(SearchResultsPage, {}) }) }), _jsx(Route, { path: '/hotels/:id/details', element: _jsx(Layout, { showHero: false, children: _jsx(HotelDetailsPage, {}) }) }), _jsx(Route, { path: '/checkout', element: _jsx(ProtectedRoute, { children: _jsx(Layout, { showHero: false, children: _jsx(CheckoutPage, {}) }) }) }), _jsx(Route, { path: '/profile', element: _jsx(ProtectedRoute, { children: _jsx(Layout, { showHero: false, children: _jsx(ProfilePage, {}) }) }) }), _jsx(Route, { path: '/login', element: _jsx(Layout, { showNavBar: true, showHero: false, children: _jsx(SignInPage, {}) }) }), _jsx(Route, { path: '/register', element: _jsx(Layout, { showNavBar: true, showHero: false, children: _jsx(RegisterPage, {}) }) }), _jsx(Route, { path: '/bookings', element: _jsx(ProtectedRoute, { children: _jsx(Layout, { showHero: false, children: _jsx(BookingHistoryPage, {}) }) }) })] }));
}
export default App;
