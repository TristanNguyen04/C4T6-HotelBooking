import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
const PrimaryGuestCard = ({ onGuestDetailsChange, initialData = {} }) => {
    const [formData, setFormData] = useState({
        primaryGuestTitle: initialData.primaryGuestTitle || 'Mr',
        primaryGuestFirstName: initialData.primaryGuestFirstName || '',
        primaryGuestLastName: initialData.primaryGuestLastName || '',
        primaryGuestPhoneNumber: initialData.primaryGuestPhoneNumber || '',
        specialRequest: initialData.specialRequest || ''
    });
    const [errors, setErrors] = useState({});
    const handleChange = (field, value) => {
        const newFormData = { ...formData, [field]: value };
        setFormData(newFormData);
        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
        // Notify parent of changes
        onGuestDetailsChange(newFormData);
    };
    const validateField = (field, value) => {
        if (field === 'primaryGuestFirstName' && !value.trim()) {
            setErrors(prev => ({ ...prev, [field]: 'First name is required' }));
            return false;
        }
        if (field === 'primaryGuestLastName' && !value.trim()) {
            setErrors(prev => ({ ...prev, [field]: 'Last name is required' }));
            return false;
        }
        if (field === 'primaryGuestPhoneNumber' && !value.trim()) {
            setErrors(prev => ({ ...prev, [field]: 'Phone number is required' }));
            return false;
        }
        return true;
    };
    const handleBlur = (field, value) => {
        validateField(field, value);
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-xl font-bold text-gray-900 mb-6", children: "Primary Guest Details" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Title *" }), _jsxs("select", { value: formData.primaryGuestTitle, onChange: (e) => handleChange('primaryGuestTitle', e.target.value), className: "w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white", children: [_jsx("option", { value: "Mr", children: "Mr" }), _jsx("option", { value: "Mrs", children: "Mrs" }), _jsx("option", { value: "Ms", children: "Ms" }), _jsx("option", { value: "Dr", children: "Dr" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "First Name *" }), _jsx("input", { type: "text", value: formData.primaryGuestFirstName, onChange: (e) => handleChange('primaryGuestFirstName', e.target.value), onBlur: (e) => handleBlur('primaryGuestFirstName', e.target.value), className: `w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.primaryGuestFirstName ? 'border-red-500' : 'border-gray-300'}`, placeholder: "Enter first name" }), errors.primaryGuestFirstName && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.primaryGuestFirstName }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Last Name *" }), _jsx("input", { type: "text", value: formData.primaryGuestLastName, onChange: (e) => handleChange('primaryGuestLastName', e.target.value), onBlur: (e) => handleBlur('primaryGuestLastName', e.target.value), className: `w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.primaryGuestLastName ? 'border-red-500' : 'border-gray-300'}`, placeholder: "Enter last name" }), errors.primaryGuestLastName && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.primaryGuestLastName }))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Phone Number *" }), _jsx("input", { type: "tel", value: formData.primaryGuestPhoneNumber, onChange: (e) => handleChange('primaryGuestPhoneNumber', e.target.value), onBlur: (e) => handleBlur('primaryGuestPhoneNumber', e.target.value), className: `w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.primaryGuestPhoneNumber ? 'border-red-500' : 'border-gray-300'}`, placeholder: "Enter phone number" }), errors.primaryGuestPhoneNumber && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.primaryGuestPhoneNumber }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Special Requests (Optional)" }), _jsx("textarea", { value: formData.specialRequest, onChange: (e) => handleChange('specialRequest', e.target.value), rows: 4, className: "w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "Any special requests or preferences (e.g., room preferences, dietary requirements, accessibility needs)..." }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Special requests are subject to availability and may incur additional charges." })] })] }), _jsx("div", { className: "mt-6 p-4 bg-gray-50 rounded-lg", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["By proceeding with this booking, you agree to our", ' ', _jsx("span", { className: "text-blue-600 hover:underline", children: "Terms of Service" }), ' ', "and", ' ', _jsx("span", { className: "text-blue-600 hover:underline", children: "Privacy Policy" }), "."] }) })] }));
};
export default PrimaryGuestCard;
