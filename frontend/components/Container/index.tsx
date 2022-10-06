import React from "react";

interface IContainer {
  children: React.ReactNode;
  className?: string;
  style?: any;
}

const Container = ({ children, className, style }: IContainer) => {
  return (
    <div className={`px-0 md:px-6 lg:px-12 ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Container;
