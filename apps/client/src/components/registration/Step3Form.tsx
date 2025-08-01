interface Step3FormProps {
  email: string;
  name: string;
  acceptsDeals: boolean;
  onAcceptsDealsChange: (value: boolean) => void;
}

export default function Step3Form({ email, name, acceptsDeals, onAcceptsDealsChange }: Step3FormProps) {
  return (
    <>
      <p className="text-xs text-gray-500">Step 3: Preferences</p>
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium text-gray-700 mb-2">Account Summary</h3>
        <p className="text-sm text-gray-600">Email: {email}</p>
        <p className="text-sm text-gray-600">Name: {name}</p>
      </div>
      
      <label className="flex items-start gap-2 text-sm text-gray-700">
        <input
          id="deals"
          type="checkbox"
          checked={acceptsDeals}
          onChange={(e) => onAcceptsDealsChange(e.target.checked)}
          className="mt-1 h-4 w-4 text-red-500 border-gray-300 rounded"
        />
        I'd like to receive exclusive deals, travel inspiration and updates from StayEase
      </label>
    </>
  );
}