import React from "react";
import useMockApiService from "./hooks/useMockApiService";
import directories from "../../../Zoo/directories";
import Toggler from "./Toggler";
import {ApiEnv, ApiEnvironment} from "../../../helpers/ApiEnvironmentManager";

interface IMSW {
  children: React.ReactNode;
  directories: any[];
}

const MockApiService = ({ children }: IMSW) => {
  useMockApiService(directories);

  if (ApiEnvironment.is(ApiEnv.PROD)) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      <Toggler />
    </>
  );
};

export default MockApiService;
