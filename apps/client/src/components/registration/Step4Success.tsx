import { useNavigate } from 'react-router-dom';

interface Step4SuccessProps {
  email: string;
  loading: boolean;
  onResendVerification: () => void;
}

export default function Step4Success({ email, loading, onResendVerification }: Step4SuccessProps) {
  const navigate = useNavigate();

  return (
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
          {email}
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
          data-cy={'go-to-login'}
          onClick={() => navigate('/login')}
          className="w-full bg-red-400 text-white py-3 rounded-md font-medium text-sm hover:bg-red-500 transition"
        >
          Go to Sign In
        </button>
        
        <button
          onClick={onResendVerification}
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
  );
}