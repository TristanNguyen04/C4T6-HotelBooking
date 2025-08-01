import { jsx as _jsx } from "react/jsx-runtime";
export default function ScreenLoader() {
    return (_jsx("div", { id: "loader-wrapper", className: "fixed inset-0 bg-white flex items-center justify-center z-[9999]", children: _jsx("div", { className: "loader" }) }));
}
