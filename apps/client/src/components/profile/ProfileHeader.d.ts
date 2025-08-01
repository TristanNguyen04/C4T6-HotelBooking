interface User {
    id: string;
    email: string;
    name?: string;
}
interface ProfileHeaderProps {
    user: User | null;
}
export default function ProfileHeader({ user }: ProfileHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
