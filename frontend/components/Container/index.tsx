import React from "react";

interface IContainer {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: IContainer) => {
  return <div className={`px-0 md:px-6 lg:px-12 ${className}`}>{children}</div>;
};

export default Container;
