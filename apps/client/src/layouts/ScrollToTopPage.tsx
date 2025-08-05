import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopPage = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        return() => {
            window.history.scrollRestoration = 'auto';
        };
    }, [pathname]);

    return null;
};

export default ScrollToTopPage;