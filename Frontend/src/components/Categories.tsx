import React from "react";

interface Category {
  name: string;
  icon: JSX.Element;
  subcategories: string[];
}

interface CategoriesProps {
  categories: Category[];
}
const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="grid grid-cols-12">
        {categories.map((item, i) => (
          <div
            className="col-span-2 gap-1 h-[150px] w-[180px] shadow-md bg-white"
            key={i}
          >
            <div className="flex justify-center flex-col gap-3 items-center w-full hover:cursor-pointer hover:shadow-xl">
              <div className="w-[80px] h-[80px] ">
                <img
                  className="h-full w-full object-cover"
                  src={
                    "https://images.unsplash.com/photo-1718804714822-8b81342a5e9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="404 categories"
                />
              </div>
              {item.subcategories[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
