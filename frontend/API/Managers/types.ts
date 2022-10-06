import { ResponseResolver, RestContext, RestRequest } from "msw";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiEnv } from "../helpers/ApiEnvironmentManager";

export enum APIMethod {
  POST = "post",
  GET = "get",
  PUT = "put",
  DELETE = "delete",
  OPTION = "option",
  PATCH = "patch",
  HEAD = "head",
}

export type MockRestResolver = ResponseResolver<
  RestRequest<any, any>,
  RestContext,
  any
>;

export type APIEndpoint = {
  __type: "__endpoint";
  baseUrl: string;
  endpoint: string;
  mock?: {
    [ApiEnv.DEV]?: MockRestResolver;
    [ApiEnv.NP]?: MockRestResolver;
  };
  method: APIMethod;
  resolve: (params: { [key: string]: string }) => {
    request: (config?: AxiosRequestConfig) => Promise<AxiosResponse<any, any>>;
  };
};
