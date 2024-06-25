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
