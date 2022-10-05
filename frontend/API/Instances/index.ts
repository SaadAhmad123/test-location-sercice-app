import {API} from "../Managers";

export const GeoHashApi = new API({
    baseURL: "https://geo.saadahmad.dev",
    timeout: 3000,
})