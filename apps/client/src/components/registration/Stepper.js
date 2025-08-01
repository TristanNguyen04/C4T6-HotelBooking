import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function Stepper({ currentStep, totalSteps = 3 }) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
    return (_jsx("div", { className: "flex items-center gap-2", children: steps.map((step, index) => (_jsxs(React.Fragment, { children: [_jsx("div", { className: `w-8 h-8 flex items-center justify-center rounded-full text-sm ${currentStep >= step ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-500'}`, children: step }), index < steps.length - 1 && (_jsx("div", { className: `h-1 flex-1 ${currentStep >= step + 1 ? 'bg-red-400' : 'bg-gray-300'}` }))] }, step))) }));
}
