import { getAllBrand } from "./repository";

const BrandService = {
    async getAllBrand (){
        return getAllBrand();
    }
}
export default BrandService;