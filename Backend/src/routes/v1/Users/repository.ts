import { User, UserDocument, UserModel } from "./model";
import { SellerUser, UserProfile } from "./types";

type UserWithoutPassword = Omit<UserDocument, "password">;

export const createUserRepo = (
  userData: User
): Promise<UserWithoutPassword> => {
  const user = new UserModel(userData);
  return user.save().then((savedUser) => {
    const { password, ...details } = savedUser.toObject();
    return details as UserWithoutPassword;
  });
};

export const getUserByEmail = (email: string): Promise<UserDocument | null> => {
  return UserModel.findOne({ email: email });
};

export const getUserById = (id: string): Promise<UserDocument | null> => {
  return UserModel.findById(id).select("-password");
};

export const updateImage = async(userId:string,file:string)=>{
  const user =await UserModel.findById(userId);
  if(!user) return;
  user.profileImage = file;
  return user.save();
}
export const updateUserVerification = (
  id: string
): Promise<UserDocument | null> => {
  return UserModel.findOneAndUpdate(
    { _id: id },
    { isVerified: true ,role:"SELLER"},
    { new: true }
  ).select("-password");
};
export const sellerRegistration = async(body:SellerUser):Promise<UserDocument | undefined>=>{
  const user = await UserModel.findById(body.id);
  if (!user) return;
  user.address = body.address;
  user.businessName = body.businessName;
  user.phNumber = body.phNumber;
  return user.save();
};

export const profileUpdate=async(body:UserProfile,userId:string):Promise<UserDocument | undefined> => {
  const user = await UserModel.findById(userId);
  if(!user) return;
  user.birthday = body.birthday;
  user.gender = body.gender;
  user.username = body.username;
  user.email = body.email;
  user.businessName =body.businessName? body.businessName:"";
  user.address = body.address?body.address:"";
  user.phNumber = body.phNumber?body.phNumber:"";
  return user.save();
};