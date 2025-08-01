interface Step3FormProps {
    email: string;
    name: string;
    acceptsDeals: boolean;
    onAcceptsDealsChange: (value: boolean) => void;
}
export default function Step3Form({ email, name, acceptsDeals, onAcceptsDealsChange }: Step3FormProps): import("react/jsx-runtime").JSX.Element;
export {};
