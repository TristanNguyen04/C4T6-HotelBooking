import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
export default function Layout({ children, showHero = false, heroContent, showNavBar = true }) {
    return (_jsxs("div", { children: [showNavBar && _jsx(NavBar, {}), showHero && (_jsx(Hero, { children: heroContent })), _jsx("div", { className: showHero ? '' : 'min-h-[70vh]', children: children }), _jsx(Footer, {})] }));
}
