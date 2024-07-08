import { generateOtp, sendVerificationEmail } from "../../../utils/OtpVerification";
import CustomError from "../../../utils/Error";
import { User } from "./model";
import { createUserRepo, getUserById, profileUpdate, sellerRegistration, updateImage, updateUserVerification } from "./repository";
import { SellerUser, UserProfile } from "./types";
import { deleteOtp, storeUserOtp } from "../Otp/repository";

const UserService = {
  async createUser(userData: User) {
    const user = await createUserRepo(userData);
    return user;
  },
  async updateUserVerification(id: string) {
    await this.getUserById(id);
    return await updateUserVerification(id);
  },
  async getUserById(id: string) {
    const user = await getUserById(id);
    if (!user) throw new CustomError("User not found", 404);
    return user;
  },
  async updateImage(userId: string, file: string) {
    this.getUserById(userId);
    const res = await updateImage(userId, file);
    if (!res) return;
    return res;
  },
  async deleteUserOtp(id: string) {
    const deletedOtp = await deleteOtp(id);
    if (!deletedOtp)
      throw new CustomError("The Otp to be deleted not found", 404);
    return deletedOtp;
  },
  async sellerRegistration(body: SellerUser) {
    this.getUserById(body.id);
    const otp = generateOtp();
    console.log(otp);
    const user = await sellerRegistration(body);
    if (!user) throw new CustomError("User not found", 404);
    sendVerificationEmail(user.email, otp);
    const otpDetails = await storeUserOtp(otp, user._id.toString());
    return { user, otpDetails };
  },
  async profileUpdate(body:UserProfile,userId:string){
    this.getUserById(userId);
    return profileUpdate(body,userId);
  }
};

export default UserService;
