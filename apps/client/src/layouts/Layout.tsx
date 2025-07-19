import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

interface LayoutProps {
    children: React.ReactNode;
    showHero?: boolean;
    heroContent?: React.ReactNode;
}

export default function Layout({ children, showHero = false, heroContent }: LayoutProps) {
    return (
        <div>
            <NavBar />
            {showHero && (
                <Hero>
                    {heroContent}
                </Hero>
            )}
            <div className={showHero ? '' : 'min-h-[70vh]'}>
                {children}
            </div>
            <Footer />
        </div>
    );
}