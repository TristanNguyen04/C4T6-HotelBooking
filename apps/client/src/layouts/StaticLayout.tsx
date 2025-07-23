import React from "react";
import StaticNavBar from "../components/StaticNavBar";

const StaticLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <StaticNavBar />
      <main className="pt-20">{children}</main> {/* Add padding to prevent content being hidden behind navbar */}
    </div>
  );
};

export default StaticLayout;
