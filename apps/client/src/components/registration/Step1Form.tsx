import React from 'react';

interface Step1FormProps {
  email: string;
  onEmailChange: (value: string) => void;
}

export default function Step1Form({ email, onEmailChange }: Step1FormProps) {
  return (
    <>
      <p className="text-xs text-gray-500">Step 1: Email Address</p>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="yourname@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          required
        />
        <p className="text-xs text-gray-400 mt-1">
          We'll send a verification code to this email
        </p>
      </div>
    </>
  );
}