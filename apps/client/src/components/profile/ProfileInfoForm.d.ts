interface User {
    id: string;
    email: string;
    name?: string;
}
interface ProfileInfoFormProps {
    user: User | null;
    onUpdate: (name: string) => Promise<void>;
}
export default function ProfileInfoForm({ user, onUpdate }: ProfileInfoFormProps): import("react/jsx-runtime").JSX.Element;
export {};
