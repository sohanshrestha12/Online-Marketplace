import { omit } from "../../../utils";
import CustomError from "../../../utils/Error";
import { signJwt } from "../../../utils/Jwt";
import { userPrivateFields } from "../Users/model";
import { getUserByEmail } from "../Users/repository";
import { Auth } from "./types";

const AuthService = {
  async login(data: Auth) {
    const user = await getUserByEmail(data.email);
    if (!user) throw new CustomError("Invalid user credentials", 401);
   
    
    const isValid = await user.comparePassword(data.password);
    if (!isValid) throw new CustomError("Invalid user credentials", 401);
    const accessToken = signJwt(
      omit(user.toJSON(), userPrivateFields),
      "accessToken",
      { expiresIn: "7d" }
    );
    const refreshToken = signJwt(
      { userId: user._id.toString() },
      "refreshToken",
      { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
  },
 
};

export default AuthService;
