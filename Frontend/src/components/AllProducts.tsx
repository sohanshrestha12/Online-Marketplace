import { useProduct } from "@/contexts/ProductContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FaAnglesDown } from "react-icons/fa6";

const AllProducts = () => {
  const { homeAllProducts, handleNextPage, hasMore } = useProduct();
  return (
    <div className="mt-5 max-w-screen-2xl">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">
        All Products
      </h3>
      <div className="grid gap-3 grid-cols-12">
        {homeAllProducts.length > 0? homeAllProducts.map((item, i) => (
          <Link
            className="col-span-2 w-full dark:!bg-slate-700 gap-1 h-fit px-2 hover:cursor-pointer hover:shadow-md bg-white hover:border-b"
            key={i}
            to={`/productDetails/${item._id}`}
          >
            <div>
              <div className="flex  flex-col w-full dark:text-white h-[280px]">
                <div className="w-[full] h-[180px] ">
                  <img
                    className="w-full h-full object-contain"
                    src={`http://localhost:5100/${item.images[0]}`}
                    alt="404 categories"
                  />
                </div>
                <div className="h-[40px] flex overflow-hidden">
                  <p className="capitalize text-sm font-semibold line-clamp-2">
                    {item.name}
                  </p>
                </div>
                <p className="text-lg font-semibold text-[#f85606]">
                  RS.{item.price}
                </p>
              </div>
            </div>
          </Link>
        )):
        <p className="px-3 col-span-12">No Products Available</p>
        }
      </div>
      {hasMore && (
        <div className="flex justify-center mt-5">
          <Button className="flex gap-2" onClick={handleNextPage}>
            View More <FaAnglesDown />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
