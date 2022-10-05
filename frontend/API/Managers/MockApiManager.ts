import {APIMethod} from "./types";
import {API} from "./index";
import {rest, RestHandler, setupWorker} from "msw";
import apiConsole from "../helpers/apiConsole";
import {ApiEnv, ApiEnvironment} from "../helpers/ApiEnvironmentManager";
import {AppEnv, AppEnvironment} from "../../helpers/AppEnvironmentManager";

export default class MockApiManager {
    directories: any[]
    started: boolean = false
    handlers: RestHandler[] = []
    worker: any
    constructor(directories: any[]) {
        this.directories = directories
    }

    private _createHandlers() {
        for (const dir in this.directories) {
            API.forEachEndpointIn(this.directories[dir], (key, e) => {
                const mockResolver = e.mock?.[ApiEnvironment.get()]
                if(!mockResolver) return
                let mockMethod = rest.all
                if (e.method === APIMethod.GET) mockMethod = rest.get
                else if (e.method === APIMethod.OPTION) mockMethod = rest.options
                else if (e.method === APIMethod.POST) mockMethod = rest.post
                else if (e.method === APIMethod.PUT) mockMethod = rest.put
                else if (e.method === APIMethod.PATCH) mockMethod = rest.patch
                else if (e.method === APIMethod.DELETE) mockMethod = rest.delete
                try {
                    this.handlers.push(mockMethod(`${e.baseUrl}${e.endpoint.split("?")[0]}`, mockResolver))
                } catch (e) {
                    apiConsole()?.error(e)
                }
            })
        }
    }

    start() {
        if (AppEnvironment.is(AppEnv.PROD) || ApiEnvironment.is(ApiEnv.PROD)) return
        if (this.started) return
        this._createHandlers()
        try {
            this.worker = setupWorker(...this.handlers)
            this.worker.start()
        } catch (e) {
            apiConsole()?.error(e)
        }
    }

    stop() {
        try {
            this.worker?.stop()
        } catch (e) {
            apiConsole()?.error(e)
        }
    }

}