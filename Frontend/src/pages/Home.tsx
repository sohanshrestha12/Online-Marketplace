import { Category } from "@/Types/Category";
import { getAllCategories } from "@/api/Product";
import CarouselComponent from "@/components/Carousel";
import Categories from "@/components/Categories";
import RecentProduct from "@/components/RecentProduct";
import { imageMapping } from "@/utils/Mapping/ImageMapping";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import {
  FiActivity,
  FiClock,
  FiGift,
  FiHeadphones,
  FiHeart,
  FiHome,
  FiShoppingCart,
  FiSmartphone,
  FiTool,
  FiTv,
} from "react-icons/fi";
import { GiPirateCoat } from "react-icons/gi";
import { PiDressLight } from "react-icons/pi";
const Home = () => {
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [level1Category, setLevel1Category] = useState<Category[]>([]);
  const [level2Category, setLevel2Category] = useState<Category[]>([]);
  const [level3Category, setLevel3Category] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [subHoverTimeout, setSubHoverTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getAllCategories();
        setAllCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    setLevel1Category(allCategory.filter((item) => item.level === 1));
    setLevel2Category(allCategory.filter((item) => item.level === 2));
    setLevel3Category(allCategory.filter((item) => item.level === 3));
  }, [allCategory]);

  const handleSubCategoryHover = (name: string) => {
    if (subHoverTimeout) {
      clearTimeout(subHoverTimeout);
    }
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setActiveSubCategory(name);
  };

  const handleSubCategoryLeave = () => {
    const subTimeout = setTimeout(() => {
      setActiveSubCategory(null);
    }, 200);
    setSubHoverTimeout(subTimeout);
  };

  const handleCategoryHover = (name: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setActiveCategory(name);
    setActiveSubCategory(null);
  };

  const handleCategoryLeave = () => {
    const timeout = setTimeout(() => {
      setActiveSubCategory(null);
      setActiveCategory(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  const iconMapping: { [key: string]: JSX.Element } = {
    "Women's Fashion": <PiDressLight />,
    "Health & Beauty": <FiHeart />,
    "Men's Fashion": <GiPirateCoat />,
    "Watches & Accessories": <FiClock />,
    "Electronic Devices": <FiSmartphone />,
    "TV & Home Appliances": <FiTv />,
    "Electronic Accessories": <FiHeadphones />,
    "Groceries & Pets": <FiShoppingCart />,
    "Barbies & Toys": <FiGift />,
    "Home & Lifestyle": <FiHome />,
    "Sports & Outdoor": <FiActivity />,
    "Motors, Tools & DIY": <FiTool />,
  };


  return (
    <>
      <div className="grid grid-cols-12 gap-3 max-w-screen-2xl">
        <div className="col-span-3 bg-[#fffefe] shadow-md py-3 justify-center flex flex-col gap-1 rounded-lg relative">
          {level1Category.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 items-center px-3 hover:bg-[#e4e3e3] py-1 transition-all justify-between hover:cursor-pointer font-medium"
              onMouseEnter={() => handleCategoryHover(item.name)}
              onMouseLeave={handleCategoryLeave}
            >
              <div className="flex gap-3 items-center">
                <span
                  className={`${
                    activeCategory === item.name ? "text-[#f85606]" : ""
                  }`}
                >
                  {iconMapping[item.name]}
                </span>
                <p
                  className={`text-sm m-0 ${
                    activeCategory === item.name ? "text-[#f85606]" : ""
                  }`}
                >
                  {item.name}
                </p>
              </div>
              {activeCategory === item.name && (
                <FaChevronRight
                  className={`text-sm ${
                    activeCategory === item.name ? "text-[#f85606]" : ""
                  }`}
                />
              )}
              {activeCategory === item.name && (
                <ul
                  onMouseEnter={() => {
                    if (subHoverTimeout) clearTimeout(subHoverTimeout);
                  }}
                  onMouseLeave={handleSubCategoryLeave}
                  className="absolute left-[102%] z-10 top-0 h-full flex flex-col gap-1 py-3 w-[200px] shadow-md bg-[#fffefe] rounded-md p-2"
                >
                  {level2Category
                    .filter(
                      (subCat) =>
                        subCat.parent === item.name && subCat.level === 2
                    )
                    .map((subcategory, index) => (
                      <div
                        key={index}
                        onMouseEnter={() => {
                          handleSubCategoryHover(subcategory.name);
                        }}
                        className="transition-all"
                      >
                        <li className="text-sm hover:text-[#f85606] px-3 transition-all py-1 hover:bg-[#e4e3e3]">
                          <p
                            className={`${
                              activeSubCategory === subcategory.name
                                ? "text-[#f85606]"
                                : ""
                            }`}
                          >
                            {subcategory.name}
                          </p>
                        </li>
                        {activeSubCategory === subcategory.name && (
                          <ul className="absolute content-start left-[102%] z-10 top-0 h-full flex flex-wrap transition-all gap-3 py-3 w-[500px] shadow-md bg-[#fffefe] rounded-md p-2">
                            {level3Category.filter(
                              (l3category) =>
                                activeSubCategory === l3category.parent
                            ).length > 0 ? (
                              level3Category
                                .filter(
                                  (l3category) =>
                                    activeSubCategory === l3category.parent
                                )
                                .map((l3cat, i) => (
                                  <div key={i} className="h-fit w-[130px]">
                                    <li className="text-sm m-0 flex flex-col gap-2 items-center  hover:text-[#f85606] px-3 transition-all py-1 h-full hover:bg-[#f0efef]">
                                      <img
                                        className="w-[80px] h-[80px] object-cover rounded-full"
                                        src={imageMapping[l3cat.name]}
                                        alt="404 product"
                                      />
                                      <p className="text-center">
                                        {l3cat.name}
                                      </p>
                                    </li>
                                  </div>
                                ))
                            ) : (
                              <li className="text-sm px-3 text-center py-1 text-gray-500">
                                No subcategories found
                              </li>
                            )}
                          </ul>
                        )}
                      </div>
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
      <Categories categories={allCategory} />
      <RecentProduct/>
    </>
  );
};

export default Home;
