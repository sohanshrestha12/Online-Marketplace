import CarouselComponent from "@/components/Carousel";
import Categories from "@/components/Categories";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import {
  FiUser,
  FiHeart,
  FiBox,
  FiClock,
  FiSmartphone,
  FiTv,
  FiHeadphones,
  FiShoppingCart,
  FiGift,
  FiHome,
  FiActivity,
  FiTool,
} from "react-icons/fi";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleCategoryHover = (index: number) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setActiveCategory(index);
  };

  const handleCategoryLeave = () => {
    const timeout = setTimeout(() => {
      setActiveCategory(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  const categories = [
    {
      name: "Women's Fashion",
      icon: <FiUser />,
      subcategories: ["Tops", "Bottoms", "Dresses", "Shoes", "Accessories"],
    },
    {
      name: "Health & Beauty",
      icon: <FiHeart />,
      subcategories: ["Skincare", "Makeup", "Haircare", "Personal Care"],
    },
    {
      name: "Men's Fashion",
      icon: <FiBox />,
      subcategories: ["Shirts", "Pants", "Shoes", "Accessories"],
    },
    {
      name: "Watches & Accessories",
      icon: <FiClock />,
      subcategories: ["Watches", "Jewelry", "Eyewear"],
    },
    {
      name: "Electronic Devices",
      icon: <FiSmartphone />,
      subcategories: ["Smartphones", "Laptops", "Tablets", "Wearables"],
    },
    {
      name: "TV & Home Appliances",
      icon: <FiTv />,
      subcategories: [
        "Televisions",
        "Refrigerators",
        "Washing Machines",
        "Microwaves",
      ],
    },
    {
      name: "Electronic Accessories",
      icon: <FiHeadphones />,
      subcategories: ["Headphones", "Chargers", "Cables"],
    },
    {
      name: "Groceries & Pets",
      icon: <FiShoppingCart />,
      subcategories: ["Food", "Pet Supplies", "Home Essentials"],
    },
    {
      name: "Barbies & Toys",
      icon: <FiGift />,
      subcategories: ["Dolls", "Action Figures", "Board Games", "Outdoor Toys"],
    },
    {
      name: "Home & Lifestyle",
      icon: <FiHome />,
      subcategories: ["Furniture", "Decor", "Kitchenware", "Bedding"],
    },
    {
      name: "Sports & Outdoor",
      icon: <FiActivity />,
      subcategories: ["Sportswear", "Fitness Equipment", "Outdoor Gear"],
    },
    {
      name: "Motors, Tools & DIY",
      icon: <FiTool />,
      subcategories: ["Automotive", "Tools", "Home Improvement"],
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-3 max-w-screen-2xl">
        <div className="col-span-3 bg-[#fffefe] shadow-md py-3 flex flex-col gap-1 rounded-lg relative">
          {categories.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 items-center px-3 hover:bg-[#e4e3e3] py-1 transition-all justify-between hover:cursor-pointer font-medium"
              onMouseEnter={() => handleCategoryHover(i)}
              onMouseLeave={handleCategoryLeave}
            >
              <div className="flex gap-3 items-center">
                <span
                  className={`${activeCategory === i ? "text-[#f85606]" : ""}`}
                >
                  {item.icon}
                </span>
                <p
                  className={`text-sm m-0 ${
                    activeCategory === i ? "text-[#f85606]" : ""
                  }`}
                >
                  {item.name}
                </p>
              </div>
              {activeCategory === i && (
                <FaChevronRight
                  className={`text-sm ${
                    activeCategory === i ? "text-[#f85606]" : ""
                  }`}
                />
              )}
              {activeCategory === i && (
                <ul className="absolute left-[102%] z-10 top-0 h-full flex flex-col gap-1 py-3 w-[200px] shadow-md bg-[#fffefe] rounded-md p-2">
                  {item.subcategories.map((subcategory, index) => (
                    <li
                      key={index}
                      className="text-sm hover:text-[#f85606] px-3 transition-all py-1 hover:bg-[#e4e3e3]"
                    >
                      {subcategory}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="col-span-9 items-center flex justify-center h-[70vh]">
          <div className="w-[100%] h-full">
            <CarouselComponent />
          </div>
        </div>
      </div>
      <Categories categories={categories} />
    </>
  );
};

export default Home;
