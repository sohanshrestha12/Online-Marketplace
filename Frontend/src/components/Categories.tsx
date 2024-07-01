import { Category } from "@/Types/Category";
import React, { useEffect, useState } from "react";


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
              className="col-span-2 gap-1 h-[150px] w-[180px] hover:cursor-pointer hover:shadow-md bg-white hover:border-b"
              key={i}
            >
              <div className="flex justify-center flex-col gap-3 items-center w-full ">
                <div className="w-[80px] h-[80px] ">
                  <img
                    className="h-full w-full object-cover"
                    src={
                      "https://images.unsplash.com/photo-1718804714822-8b81342a5e9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt="404 categories"
                  />
                </div>
                {item.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
