import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
export default function Header() {
    const navigate = useNavigate();
    return (_jsxs("header", { className: "bg-white w-full shadow-sm py-4 px-6 sm:px-12 flex justify-between items-center", children: [_jsx("div", { className: "text-2xl font-bold cursor-pointer", style: { color: '#FF6B6B' }, onClick: () => navigate("/"), children: "Ascenda" }), _jsxs("nav", { className: "hidden md:flex gap-6 text-sm text-gray-600", children: [_jsx("a", { href: "#", children: "Destinations" }), _jsx("a", { href: "#", children: "Deals" }), _jsx("a", { href: "#", children: "About Us" }), _jsx("a", { href: "#" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => navigate('/login'), className: "text-sm font-normal", style: { color: '#FF6B6B', background: 'none', border: 'none' }, children: "Sign In" }), _jsx("button", { "data-cy": 'register-button', onClick: () => navigate('/register'), className: "text-white px-4 py-1 rounded text-sm", style: { backgroundColor: '#FF6B6B' }, children: "Register" })] })] }));
}
