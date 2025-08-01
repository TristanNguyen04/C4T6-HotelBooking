interface LayoutProps {
    children: React.ReactNode;
    showHero?: boolean;
    heroContent?: React.ReactNode;
    showNavBar?: boolean;
}
export default function Layout({ children, showHero, heroContent, showNavBar }: LayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
