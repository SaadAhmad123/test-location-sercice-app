import React from "react";
import Container from "../Container";
interface INavbar {
  title?: string;
}

const Navbar: React.FC<INavbar> = ({ title }) => {
  return (
    <nav
      style={{ zIndex: 1 }}
      className="flex items-center justify-between py-2 border-b px-4 md:px-6 lg:px-12 sticky top-0 bg-white"
    >
      <div>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
    </nav>
  );
};

export default Navbar;
