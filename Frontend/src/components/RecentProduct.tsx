import { useProduct } from "@/contexts/ProductContext";
import { Link } from "react-router-dom";

const RecentProduct = () => {
  const { products } = useProduct();
  return (
    <div className="mt-5 max-w-screen-2xl">
      <h3 className="text-lg font-semibold mb-4">Recent Products</h3>
      <div className="grid grid-cols-12">
        {products.map((item, i) => (
          <Link
            className="col-span-2 gap-1 h-fit w-fit px-2 hover:cursor-pointer hover:shadow-md bg-white hover:border-b"
            key={i}
            to={`/productDetails/${item._id}`}
          >
            <div>
              <div className="flex  flex-col w-full h-[280px]">
                <div className="w-[150px] h-[180px] ">
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
        ))}
      </div>
    </div>
  );
};

export default RecentProduct;
