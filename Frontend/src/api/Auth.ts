import { RegisterUser } from "@/Types/Auth";
import { MarketUrl } from "@/config/Axios";


export const registerUser = (userData:RegisterUser)=> {
    return MarketUrl.post("/users", userData);
}