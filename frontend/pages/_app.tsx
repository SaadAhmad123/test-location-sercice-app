import React from "react";
import { AppProps } from "next/app";
import "../styles/index.css";
import "../styles/globals.css";
import { AppContextProvider } from "../AppContext";
import directories from "../API/Zoo/directories";
import MockApiService from "../API/React/components/MockApiService";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MockApiService directories={directories}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </MockApiService>
  );
}

export default MyApp;
