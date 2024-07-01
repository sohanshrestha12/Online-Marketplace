import { MarketUrl } from "@/config/Axios";
import Cookies from "js-cookie";

MarketUrl.interceptors.request.use(
    (config)=>{
        const accessToken = Cookies.get('accessToken');
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },(error)=>{
        return Promise.reject(error);
    }
)

