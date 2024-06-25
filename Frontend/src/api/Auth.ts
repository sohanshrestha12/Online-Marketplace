import { LoginUser, RegisterUser } from "@/Types/Auth";
import { MarketUrl } from "@/config/Axios";


export const registerUser = (userData:RegisterUser)=> {
    return MarketUrl.post("/users", userData);
}
export const login = (userData: LoginUser) => {
  return MarketUrl.post("/auth/login", userData);
};