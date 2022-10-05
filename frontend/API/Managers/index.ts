import axios, {Axios, AxiosRequestConfig, CreateAxiosDefaults} from "axios";
import {APIEndpoint} from "./types";
import apiConsole from "../helpers/apiConsole";


export class API {

    private readonly baseUrl: string
    axios: Axios
    constructor(axiosConfig: CreateAxiosDefaults) {
        this.baseUrl = axiosConfig.baseURL
        this.axios = axios.create(axiosConfig)
    }

    /**
     * This function creates and API endpoint which
     * will be used by the Mocking Managers as well.
     * So, if in case
     */
    endpoint(
        endpoint: APIEndpoint["endpoint"],
        method: APIEndpoint["method"],
        mock?: APIEndpoint["mock"]
    ){
        const ctx = this
        return {
            __type: "__endpoint",
            baseUrl: this.baseUrl,
            endpoint,
            mock,
            method,
            resolve: function(
                params: {[key: string] : string},
            ) {
                const url = API.resolve(this)(params)
                return {
                    request: (config?: AxiosRequestConfig) => {
                        return ctx.axios.request({
                            ...(config || {}),
                            url,
                            method: this.method
                        })
                    }
                }
            }
        } as APIEndpoint
    }

    static isEndpoint(endpoint: any) {
        return endpoint?.__type === "__endpoint"
    }

    static resolve(endpoint: APIEndpoint) {

        return (params: {[key: string] : string}) => {
           let ep = endpoint.endpoint
           for (const key in params) {
               ep = ep.replace(key, params[key])
           }
           return ep
        }
    }

    /**
     * This function goes through the tree of the API directory
     * and calls a callback function on each endpoint
     * @param directory - The API Directory
     * @param callback - The callback function. The inputs to the callback functions
     *                   coming in are the path and the endpoint
     */
    static forEachEndpointIn(directory: any, callback: (path: string, endpoint: APIEndpoint) => void) {
        try {
            _forEachEndpointIn(directory, callback)
        } catch (e) {
            apiConsole()?.error(e)
        }
        // Let it hoist... lol
        function _forEachEndpointIn(directory: any, callback: (path: string, endpoint: APIEndpoint) => void, __key = "") {
            for (const key in directory) {
                if (directory[key]?.__type === "__endpoint")
                    callback(`${__key}${__key && "."}${key}`, directory[key] as APIEndpoint)
                else _forEachEndpointIn(directory[key], callback, `${__key}${__key && "."}${key}`)
            }
        }
    }

}