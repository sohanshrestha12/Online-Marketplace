import { User } from "./model";
import { createUserRepo } from "./repository";

const UserService = {
  async createUser(userData: User) {
    const user = await createUserRepo(userData);
    return user;
  },
};

export default UserService;
