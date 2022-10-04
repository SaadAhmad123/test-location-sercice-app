import React from "react";
import Navbar from "../Navbar";
import Head from "next/head";

interface ILayout {
  title?: {
    header?: string;
    nav?: string;
  };
  children: React.ReactNode;
  nav?: boolean;
  className?: string;
}

const Layout = ({ children, title, nav = true, className = "" }: ILayout) => {
  return (
    <section className={`bg-white dark:bg-black min-h-screen ${className}`}>
      <Head>
        <title>{`Saad Ahmad | ${title?.header || "GeoHash"}`}</title>
      </Head>
      {nav && <Navbar title={title?.nav} />}
      <main>{children}</main>
    </section>
  );
};

export default Layout;
