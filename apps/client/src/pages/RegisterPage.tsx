import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, resendVerificationEmail } from "../api/auth";
import { 
  Step1Form, 
  Step2Form, 
  Step3Form, 
  Step4Success, 
  Stepper, 
  RegistrationSidebar 
} from "../components/registration";

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

  // Individual field handlers for component props
  const handleEmailChange = (value: string) => {
    setFormData(prev => ({ ...prev, email: value }));
  };

  const handleNameChange = (value: string) => {
    setFormData(prev => ({ ...prev, name: value }));
  };

  const handlePasswordChange = (value: string) => {
    setFormData(prev => ({ ...prev, password: value }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setFormData(prev => ({ ...prev, confirmPassword: value }));
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
          <Step1Form
            email={formData.email}
            onEmailChange={handleEmailChange}
          />
        );
      
      case 2:
        return (
          <Step2Form
            name={formData.name}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            onNameChange={handleNameChange}
            onPasswordChange={handlePasswordChange}
            onConfirmPasswordChange={handleConfirmPasswordChange}
          />
        );
      
      case 3:
        return (
          <Step3Form
            email={formData.email}
            name={formData.name}
            acceptsDeals={acceptsDeals}
            onAcceptsDealsChange={setAcceptsDeals}
          />
        );
      
      case 4:
        return (
          <Step4Success
            email={formData.email}
            loading={loading}
            onResendVerification={handleResendVerification}
          />
        );
      
      default:
        return null;
    }
  };

  return (
      <div className="bg-gray-50 flex justify-center mt-20">
        {/* Main Content */}
        <main className="flex flex-1 justify-center mt-20 px-4 py-14 mb-20">
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
              <Stepper currentStep={step} totalSteps={3} />
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
          <RegistrationSidebar step={step} />
        </div>
      </main>
      </div>
  );
}
