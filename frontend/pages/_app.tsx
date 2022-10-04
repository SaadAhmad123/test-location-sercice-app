import React from "react";
import { AppProps } from "next/app";
import "../styles/index.css";
import { AppContextProvider } from "../AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
