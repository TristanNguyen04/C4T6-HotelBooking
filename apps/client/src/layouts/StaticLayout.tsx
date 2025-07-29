import React from "react";
import StaticNavBar from "../components/StaticNavBar";
import Footer from "../components/Footer";

const StaticLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <StaticNavBar />
      <main className="pt-5">{children}</main> {/* Add padding to prevent content being hidden behind navbar */}
      <Footer />
    </div>
  );
};

export default StaticLayout;



