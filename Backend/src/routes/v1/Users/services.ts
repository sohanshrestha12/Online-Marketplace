import CustomError from "../../../utils/Error";
import { User } from "./model";
import { createUserRepo, getUserById } from "./repository";

const UserService = {
  async createUser(userData: User) {
    const user = await createUserRepo(userData);
    return user;
  },
  async getUserById(id: string) {
    const user = await getUserById(id);
    if (!user) throw new CustomError("User not found", 404);
    return user;
  },
};

export default UserService;
