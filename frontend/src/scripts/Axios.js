import axios from 'axios';
import _ from 'lodash';

function AxiosClient() {
    let new_axios = axios.create({
        headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json"
        }
    });

    new_axios.interceptors.request.use((config) => {
        let access = localStorage.getItem("TEST-AUTH");
        if (access != null) config.headers["Authorization"] = `Bearer ${access}`;
        
        console.log("Interceptor, pre-config", config);

        return config;
    }, (error) => {
        console.log("Interceptor, possble error in config", error);

        return Promise.reject(error);
    });

    new_axios.interceptors.response.use((response) => {
        console.log("Interceptor, response", response);

        return response;
    }, async (error) => {
        let config = error.config;

        if (error.response.status == 401) {
            if (error.response.data.code == "token_not_valid") {
                // do something
            }
        }
        else {
            return Promise.reject(error);
        }
    });

    return new_axios;
}

export const Axios = globalThis.Axios || AxiosClient();
globalThis.Axios = Axios;