import React, { useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAuth } from '../contexts/AuthContext';
import { generateDefaultSearchUrl } from '../utils/date';

const NavBar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const navLinks = [
        { name: 'Destinations', path: generateDefaultSearchUrl('Singapore, Singapore', 'RsBU') },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isSearchPage = location.pathname === '/search';
    
    // Function to determine if a nav link is active based on current page
    const isNavLinkActive = (linkName: string) => {
        switch (linkName) {
            case 'Destinations':
                return isSearchPage;
            case 'About Us':
                return location.pathname === '/about';
            case 'Contact':
                return location.pathname === '/contact';
            default:
                return false;
        }
    };
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('Logo clicked, navigating to home');
        navigate('/', { replace: true });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
    };

    const getUserInitial = () => {
        if (user?.name) {
            return user.name.charAt(0).toUpperCase();
        }
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(false);
        navigate('/profile');
    };

    const handleBookingClick = () => {
        setIsDropdownOpen(false);
        navigate('/bookings');
    };

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center bg-white justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-[1100] ${
            isHomePage
                ? (isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6")
                : "bg-gray-500 shadow-md py-4 md:py-6"
        }`}>
            {/* Logo */}
            <div className="flex-shrink-0">
                <button onClick={handleLogoClick} className="cursor-pointer bg-transparent border-none p-0">
                    <div className='flex items-center space-x-2'>
                        <span className="font-bold text-[24px] leading-[36px] text-[#FF6B6B]">
                            StayEase
                        </span>
                        <span className="font-extralight text-[14px] leading-[20px] text-gray-700">
                            Comfort wherever you go
                        </span>
                    </div>
                </button>
            </div>

            {/* Desktop Nav - Centered */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8 absolute left-1/2 transform -translate-x-1/2">
                {navLinks.map((link, i) => {
                    const isDestinationsLink = link.name === 'Destinations';
                    const isDisabled = isDestinationsLink && isSearchPage;
                    const isActive = isNavLinkActive(link.name);
                    
                    if (isDisabled) {
                        return (
                            <span key={i} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-black"} font-normal cursor-not-allowed`}>
                                {link.name}
                                <div className={`${isScrolled ? "bg-gray-700" : "bg-black"} h-0.5 w-full transition-all duration-300`} />
                            </span>
                        );
                    }
                    
                    return (
                        <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-black"} font-normal`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-black"} h-0.5 transition-all duration-300 ${
                                isActive ? 'w-full' : 'w-0 group-hover:w-full'
                            }`} />
                        </Link>
                    );
                })}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-1 flex-shrink-0">
                {user ? (
                    // Logged in state - User Avatar with Dropdown
                    <div className="relative" ref={dropdownRef}>
                        <button
                            data-cy={'click-profile-icon'}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-10 h-10 bg-[#FF6B6B] text-white rounded-full flex items-center justify-center font-semibold text-lg hover:bg-[#ff5a5a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2"
                        >
                            {getUserInitial()}
                        </button>
                        
                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[1100]">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user.name || user.email}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user.email}
                                    </p>
                                </div>
                                
                                <button
                                    data-cy={'go-to-profile'}
                                    onClick={handleProfileClick}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profile
                                </button>
                                
                                <button
                                    data-cy={'go-to-booking'}
                                    onClick={handleBookingClick}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    My Bookings
                                </button>
                                
                                <div className="border-t border-gray-100 mt-2 pt-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Logged out state
                    <>
                        <button 
                            onClick={() => navigate('/login')}
                            className={`ml-6 transition-all duration-500 ${isScrolled ? "text-[#FF6B6B]" : "text-[#FF6B6B]"} hover:underline`}
                        >
                            Sign In
                        </button>
                        <button 
                            data-cy={'register-button'}
                            onClick={() => navigate('/register')}
                            className={`px-4 py-2.5 rounded-xl ml-3 transition-all duration-500 bg-[#FF6B6B] text-white hover:bg-[#ff5a5a]`}
                        >
                            Register
                        </button>
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close-menu" className='h-6.5' />
                </button>

                {navLinks.map((link, i) => {
                    const isDestinationsLink = link.name === 'Destinations';
                    const isDisabled = isDestinationsLink && isSearchPage;
                    const isActive = isNavLinkActive(link.name);
                    
                    if (isDisabled) {
                        return (
                            <span key={i} className="text-gray-800 cursor-not-allowed font-bold underline underline-offset-4">
                                {link.name}
                            </span>
                        );
                    }
                    
                    return (
                        <Link 
                            key={i} 
                            to={link.path} 
                            onClick={() => setIsMenuOpen(false)}
                            className={isActive ? 'font-bold underline underline-offset-4' : ''}
                        >
                            {link.name}
                        </Link>
                    );
                })}

                {user ? (
                    // Mobile logged in state
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-[#FF6B6B] text-white rounded-full flex items-center justify-center font-semibold text-2xl">
                            {getUserInitial()}
                        </div>
                        <span className="text-gray-700 text-center">
                            {user.name || user.email}
                        </span>
                        <button 
                            onClick={handleProfileClick}
                            className="border border-[#FF6B6B] text-[#FF6B6B] px-8 py-2.5 rounded-full transition-all duration-500"
                        >
                            Profile
                        </button>
                        <button 
                            onClick={handleBookingClick}
                            className="border border-[#FF6B6B] text-[#FF6B6B] px-8 py-2.5 rounded-full transition-all duration-500"
                        >
                            My Bookings
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="bg-[#FF6B6B] text-white px-8 py-2.5 rounded-full transition-all duration-500"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    // Mobile logged out state
                    <div className="flex flex-col gap-4">
                        <button 
                            onClick={() => {
                                navigate('/login');
                                setIsMenuOpen(false);
                            }}
                            className="border border-[#FF6B6B] text-[#FF6B6B] px-8 py-2.5 rounded-full transition-all duration-500"
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={() => {
                                navigate('/register');
                                setIsMenuOpen(false);
                            }}
                            className="bg-[#FF6B6B] text-white px-8 py-2.5 rounded-full transition-all duration-500"
                        >
                            Register
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;