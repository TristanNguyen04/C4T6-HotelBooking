interface PasswordChangeFormProps {
    onChangePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}
export default function PasswordChangeForm({ onChangePassword }: PasswordChangeFormProps): import("react/jsx-runtime").JSX.Element;
export {};
