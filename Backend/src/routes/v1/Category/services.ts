import { getAllCategory } from "./repository";

const CategoryService = {
  async getAllCategory() {
    return getAllCategory();
  },
};
export default CategoryService;