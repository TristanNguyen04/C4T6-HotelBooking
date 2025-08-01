import { jsx as _jsx } from "react/jsx-runtime";
export default function Spinner() {
    return (_jsx("div", { className: "flex justify-center p-8", children: _jsx("div", { className: "w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" }) }));
}
