import axios from 'axios';

function AxiosClient() {
    let new_axios = axios.create({
        headers: {
            "Cache-Control": "no-cache"
        }
    });

    new_axios.interceptors.request.use((config) => {
        console.log("Interceptor, pre-config", config);

        return config;
    }, (error) => {
        console.log("Interceptor, possble error in config", error);
    });

    return new_axios;
}

export const Axios = globalThis.Axios || AxiosClient();
globalThis.Axios = Axios;