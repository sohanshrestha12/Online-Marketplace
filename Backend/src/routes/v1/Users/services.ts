import CustomError from "../../../utils/Error";
import { User } from "./model";
import { createUserRepo, getUserById, updateImage } from "./repository";

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
  async updateImage(userId:string,file:string){
    this.getUserById(userId);
    const res = await updateImage(userId,file);
    if(!res) return;
    return res;
  },
};

export default UserService;
