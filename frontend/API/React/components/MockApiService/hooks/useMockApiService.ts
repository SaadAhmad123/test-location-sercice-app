import { useRef, useEffect } from "react";
import MockApiManager from "../../../../Managers/MockApiManager";
import {localStorageConfig} from "../localStorage.config";

const useMockApiService = (directories: any[]) => {
  const {KEY, TRUE} = localStorageConfig
  const mock = useRef(new MockApiManager(directories));
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      const useMock = window?.localStorage?.getItem?.(KEY) === TRUE
      if (useMock) mock.current.start();
    }
    return () => {
      mock.current.stop();
    };
  }, [mounted, mock]);
};

export default useMockApiService;
