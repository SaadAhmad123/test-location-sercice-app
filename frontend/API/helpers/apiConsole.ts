import { ApiEnv, ApiEnvironment } from "./ApiEnvironmentManager";

const apiConsole = () => {
  if (ApiEnvironment.is(ApiEnv.DEV, ApiEnv.NP)) return console;
  return undefined;
};

export default apiConsole;
