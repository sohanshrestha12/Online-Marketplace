import { LoginUser, RegisterUser } from "@/Types/Auth";
import { MarketUrl } from "@/config/Axios";
import '../config/AxiosInterceptor';


export const registerUser = (userData:RegisterUser)=> {
    return MarketUrl.post("/users", userData);
}
export const login = (userData: LoginUser) => {
  return MarketUrl.post("/auth/login", userData);
};

export const getCurrentUser = () => {
  return MarketUrl.get("/users/getCurrentUser");
};

export const logout = () => {
  return MarketUrl.post("/auth/logout");
};

export const verifyUser = (id: string, code: string) => {
  return MarketUrl.post(`/users/verifyOtp/${id}/${code}`);
};
