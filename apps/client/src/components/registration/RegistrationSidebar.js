import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import luggageImg from '../../assets/luggage.png';
export default function RegistrationSidebar({ step }) {
    const getContent = () => {
        if (step === 4) {
            return {
                title: 'Almost there!',
                description: 'Just one more step - verify your email and start exploring amazing destinations with exclusive member benefits.'
            };
        }
        return {
            title: 'Your journey begins here',
            description: 'Join thousands of travelers who book their perfect stays with StayEase. Unlock exclusive member rates and collect rewards with every booking.'
        };
    };
    const { title, description } = getContent();
    return (_jsxs("div", { className: "w-full md:w-1/2 bg-gradient-to-br from-orange-300 to-pink-400 px-10 py-12 flex flex-col justify-center items-center text-center gap-4", children: [_jsx("img", { src: luggageImg, alt: "Luggage", className: "w-50 h-auto" }), _jsx("h2", { className: "text-white text-xl font-semibold", children: title }), _jsx("p", { className: "text-white text-sm max-w-sm", children: description }), _jsxs("div", { className: "flex flex-col gap-3 w-full max-w-xs", children: [_jsx("button", { className: "bg-white text-orange-500 py-2 rounded font-semibold", children: "Member-only deals" }), _jsx("button", { className: "bg-white text-orange-500 py-2 rounded font-semibold", children: "Reward points" }), _jsx("button", { className: "bg-white text-orange-500 py-2 rounded font-semibold", children: "Save favorites" })] })] }));
}
