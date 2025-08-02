import React, { useState } from 'react';
import type { GuestDetails } from '../../types/hotel';

interface PrimaryGuestCardProps {
  onGuestDetailsChange: (guestDetails: GuestDetails) => void;
  initialData?: Partial<GuestDetails>;
}

const PrimaryGuestCard: React.FC<PrimaryGuestCardProps> = ({ 
  onGuestDetailsChange, 
  initialData = {} 
}) => {
  const [formData, setFormData] = useState<GuestDetails>({
    primaryGuestTitle: initialData.primaryGuestTitle || 'Mr',
    primaryGuestFirstName: initialData.primaryGuestFirstName || '',
    primaryGuestLastName: initialData.primaryGuestLastName || '',
    primaryGuestPhoneNumber: initialData.primaryGuestPhoneNumber || '',
    specialRequest: initialData.specialRequest || ''
  });

  const [errors, setErrors] = useState<Partial<GuestDetails>>({});

  const handleChange = (field: keyof GuestDetails, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Notify parent of changes
    onGuestDetailsChange(newFormData);
  };

  const validateField = (field: keyof GuestDetails, value: string) => {
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

  const handleBlur = (field: keyof GuestDetails, value: string) => {
    validateField(field, value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Primary Guest Details</h2>
      
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <select
            value={formData.primaryGuestTitle}
            onChange={(e) => handleChange('primaryGuestTitle', e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
        </div>

        {/* Name Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              data-cy={'first-name'}
              type="text"
              value={formData.primaryGuestFirstName}
              onChange={(e) => handleChange('primaryGuestFirstName', e.target.value)}
              onBlur={(e) => handleBlur('primaryGuestFirstName', e.target.value)}
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.primaryGuestFirstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter first name"
            />
            {errors.primaryGuestFirstName && (
              <p className="text-red-500 text-xs mt-1">{errors.primaryGuestFirstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              data-cy={'last-name'}
              type="text"
              value={formData.primaryGuestLastName}
              onChange={(e) => handleChange('primaryGuestLastName', e.target.value)}
              onBlur={(e) => handleBlur('primaryGuestLastName', e.target.value)}
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.primaryGuestLastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter last name"
            />
            {errors.primaryGuestLastName && (
              <p className="text-red-500 text-xs mt-1">{errors.primaryGuestLastName}</p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            data-cy={'phone-number'}
            type="tel"
            value={formData.primaryGuestPhoneNumber}
            onChange={(e) => handleChange('primaryGuestPhoneNumber', e.target.value)}
            onBlur={(e) => handleBlur('primaryGuestPhoneNumber', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.primaryGuestPhoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter phone number"
          />
          {errors.primaryGuestPhoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.primaryGuestPhoneNumber}</p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            data-cy={'special-request'}
            value={formData.specialRequest}
            onChange={(e) => handleChange('specialRequest', e.target.value)}
            rows={4}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any special requests or preferences (e.g., room preferences, dietary requirements, accessibility needs)..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Special requests are subject to availability and may incur additional charges.
          </p>
        </div>
      </div>

      {/* Terms Notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          By proceeding with this booking, you agree to our{' '}
          <span className="text-blue-600 hover:underline">Terms of Service</span>
          {' '}and{' '}
          <span className="text-blue-600 hover:underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default PrimaryGuestCard; 