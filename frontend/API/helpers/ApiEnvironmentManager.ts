export enum ApiEnv {
    DEV = "dev",
    NP = "np",
    PROD = "prod",
}

export class ApiEnvironment {
    static get() {
        const env = process.env.API_BUILD
        if (env === "dev") return ApiEnv.DEV
        if (env === "np") return ApiEnv.NP
        if (env === "prod") return ApiEnv.PROD
        return ApiEnv.PROD
    }

    static is(...args: ApiEnv[]) {
        return args.includes(ApiEnvironment.get())
    }
}