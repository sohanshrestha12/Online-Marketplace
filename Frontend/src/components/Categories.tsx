import { Category } from "@/Types/Category";
import { imageMapping } from "@/utils/Mapping/ImageMapping";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface CategoriesProps {
  categories: Category[];
}

const shuffleArray = (array: Category[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const [shuffledCategories, setShuffledCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setShuffledCategories(shuffleArray([...categories]));
  }, [categories]);
  return (
    <div className="mt-5 max-w-screen-2xl">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="grid grid-cols-12">
        {shuffledCategories
          .filter((cate) => cate.level === 3)
          .splice(0, 12)
          .map((item, i) => (
            <div
              onClick={()=>navigate(`/productLists?category=${item.name}`)}
              className="col-span-2 gap-1 h-[150px] w-[180px] hover:cursor-pointer hover:shadow-md bg-white hover:border-b"
              key={i}
            >
              <div className="flex justify-center flex-col gap-3 items-center w-full ">
                <div className="w-[80px] h-[80px] ">
                  <img
                    className="h-full w-full object-cover"
                    src={
                      imageMapping[item.name]
                    }
                    alt="404 categories"
                  />
                </div>
                <p className="text-center">{item.name}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
