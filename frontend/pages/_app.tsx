import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "../styles/index.css";
import "../styles/globals.css";
import { AppContextProvider } from "../AppContext";
import useMockApiService from "../hooks/useMockApiService";
import directories from "../API/Zoo/directories";

function MyApp({ Component, pageProps }: AppProps) {
  useMockApiService(directories);
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
