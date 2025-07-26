import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import luggageImg from "../assets/luggage.png";
import { register, resendVerificationEmail } from "../api/auth";
import Layout from "../layouts/Layout";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptsDeals, setAcceptsDeals] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      // Validate email
      if (!formData.email || !formData.email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validate name and password
      if (!formData.name.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!formData.password || formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Submit registration
      setLoading(true);
      try {
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name
        });
        
        // Move to success step
        setStep(4);
      } catch (err: unknown) {
        const errorMessage = err && typeof err === 'object' && 'response' in err && 
          err.response && typeof err.response === 'object' && 'data' in err.response &&
          err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
          ? String(err.response.data.error)
          : 'Registration failed. Please try again.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResendVerification = async () => {
    setLoading(true);
    try {
      await resendVerificationEmail({ email: formData.email });
      alert('Verification email sent again. Please check your inbox.');
    } catch {
      alert('Failed to resend verification email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
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
                value={formData.email}
                onChange={handleInputChange}
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
      
      case 2:
        return (
          <>
            <p className="text-xs text-gray-500">Step 2: Personal Information</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                  required
                />
              </div>
            </div>
          </>
        );
      
      case 3:
        return (
          <>
            <p className="text-xs text-gray-500">Step 3: Preferences</p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-700 mb-2">Account Summary</h3>
              <p className="text-sm text-gray-600">Email: {formData.email}</p>
              <p className="text-sm text-gray-600">Name: {formData.name}</p>
            </div>
            
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                id="deals"
                type="checkbox"
                checked={acceptsDeals}
                onChange={(e) => setAcceptsDeals(e.target.checked)}
                className="mt-1 h-4 w-4 text-red-500 border-gray-300 rounded"
              />
              I'd like to receive exclusive deals, travel inspiration and updates from StayEase
            </label>
          </>
        );
      
      case 4:
        return (
          <>
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              {/* Success Message */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  We've sent a verification email to:
                </p>
                <p className="text-sm font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                  {formData.email}
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-left">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Next Steps:</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the verification link in the email</li>
                  <li>Return here and sign in to your account</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-red-400 text-white py-3 rounded-md font-medium text-sm hover:bg-red-500 transition"
                >
                  Go to Sign In
                </button>
                
                <button
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-md font-medium text-sm hover:bg-gray-200 transition disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </div>

              {/* Help Text */}
              <p className="text-xs text-gray-500">
                Didn't receive the email? Check your spam folder or try resending.
              </p>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout showNavBar={false}>
      <div className="bg-gray-50 flex justify-center py-12 mt-[-100px] mb-[100px]">
        {/* Main Content */}
        <main className="flex flex-1 justify-center mt-35 px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-6xl overflow-hidden items-stretch">

          {/* Left side: Form */}
          <div className="w-full md:w-1/2 px-12 py-14 flex flex-col justify-center gap-8">
            <div>
              <h2 className="text-2xl font-semibold">
                {step === 4 ? 'Welcome to StayEase!' : 'Create your account'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {step === 4 
                  ? 'Your account has been created successfully.'
                  : 'Join StayEase to unlock exclusive deals and manage your bookings with ease.'
                }
              </p>
            </div>

            {/* Stepper - Only show for steps 1-3 */}
            {step <= 3 && (
              <>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                    step >= 1 ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>1</div>
                  <div className={`h-1 flex-1 ${step >= 2 ? 'bg-red-400' : 'bg-gray-300'}`}></div>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                    step >= 2 ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>2</div>
                  <div className={`h-1 flex-1 ${step >= 3 ? 'bg-red-400' : 'bg-gray-300'}`}></div>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                    step >= 3 ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>3</div>
                </div>
              </>
            )}

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Form - Only show for steps 1-3 */}
            {step <= 3 && (
              <form onSubmit={handleContinue} className="flex flex-col gap-6">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  {step > 1 && (
                    <button 
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-md font-medium text-sm hover:bg-gray-300 transition"
                    >
                      ← Back
                    </button>
                  )}
                  
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-red-400 text-white py-3 rounded-md font-medium text-sm hover:bg-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : step === 3 ? 'Create Account' : 'Continue →'}
                  </button>
                </div>
              </form>
            )}

            {/* Success Step Content */}
            {step === 4 && (
              <div className="flex flex-col gap-6">
                {renderStepContent()}
              </div>
            )}

            {/* Footer - Only show for steps 1-3 */}
            {step <= 3 && (
              <>
                <p className="text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <span className="text-red-500 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
                    Sign in
                  </span>
                </p>

                <p className="text-xs text-center text-gray-400 mt-4">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-pink-400 underline">Privacy Policy</a> and{" "}
                  <a href="#" className="text-pink-400 underline">Terms of Service</a>.
                </p>
              </>
            )}
          </div>

          {/* Right side: Image and Benefits */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-300 to-pink-400 px-10 py-12 flex flex-col justify-center items-center text-center gap-4">
            <img src={luggageImg} alt="Luggage" className="w-50 h-auto" />
            <h2 className="text-white text-xl font-semibold">
              {step === 4 ? 'Almost there!' : 'Your journey begins here'}
            </h2>
            <p className="text-white text-sm max-w-sm">
              {step === 4 
                ? 'Just one more step - verify your email and start exploring amazing destinations with exclusive member benefits.'
                : 'Join thousands of travelers who book their perfect stays with StayEase. Unlock exclusive member rates and collect rewards with every booking.'
              }
            </p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <button className="bg-white text-orange-500 py-2 rounded font-semibold">Member-only deals</button>
              <button className="bg-white text-orange-500 py-2 rounded font-semibold">Reward points</button>
              <button className="bg-white text-orange-500 py-2 rounded font-semibold">Save favorites</button>
            </div>
          </div>
        </div>
      </main>
      </div>
    </Layout>
  );
}
