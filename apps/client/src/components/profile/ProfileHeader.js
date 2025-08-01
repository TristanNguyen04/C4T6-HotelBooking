import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ProfileHeader({ user }) {
    return (_jsx("div", { className: "bg-[#FF6B6B] px-6 py-8", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-16 h-16 bg-white text-[#FF6B6B] rounded-full flex items-center justify-center font-bold text-2xl", children: user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U' }), _jsxs("div", { className: "text-white", children: [_jsx("h1", { className: "text-2xl font-bold", children: user?.name || 'User' }), _jsx("p", { className: "text-red-100", children: user?.email })] })] }) }));
}
