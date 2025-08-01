interface Step2FormProps {
    name: string;
    password: string;
    confirmPassword: string;
    onNameChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onConfirmPasswordChange: (value: string) => void;
}
export default function Step2Form({ name, password, confirmPassword, onNameChange, onPasswordChange, onConfirmPasswordChange }: Step2FormProps): import("react/jsx-runtime").JSX.Element;
export {};
