import { User, UserDocument, UserModel } from "./model";

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
