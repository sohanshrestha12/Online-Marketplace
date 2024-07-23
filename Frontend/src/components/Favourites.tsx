import { getAllUserFavourites } from "@/api/Like";
import { FavProduct } from "@/Types/Product";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

const Favourites = () => {
  useEffect(() => {
    const getFavourites = async () => {
      try {
        const res = await getAllUserFavourites();
        setFavourites(res.data.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getFavourites();
  }, []);

  const [favourites, setFavourites] = useState<FavProduct[]>([]);
  return (
    <div>
      {favourites.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {favourites.map((item) => (
            <Link to={`/productDetails/${item.productId._id}`}>
              <div
                className=" w-[260px] h-[420px] hover:cursor-pointer hover:scale-105 transition-all"
                style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
              >
                <div className="w-full h-[250px]">
                  <img
                    className="w-full h-full object-fill"
                    src={`http://localhost:5100/${item.productId.images[0]}`}
                    alt=""
                  />
                </div>
                <div className="flex justify-between mt-2 px-3">
                  <div className="h-[70px]">
                    <h3 className="capitalize font-semibold break-words line-clamp-2 ">
                      {item.productId.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-semibold">
                      {item.productId.brand}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {" "}
                      RS.{item.productId.price}
                    </p>
                  </div>
                </div>
                <div className="px-3 py-3">
                  <h3 className="font-semibold">Sizes</h3>
                  <div className="flex gap-3 mt-2">
                    {item.productId.size.map((size) => (
                      // <div className="text-xs px-[10px] font-semibold bg-gray-50 mt-2 py-1 w-fit rounded-full border-[2px] border-[#f85606]">
                      <Badge>{size}cm</Badge>
                      // </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-[70vh] flex justify-center items-center">
          No favourite items yet
        </div>
      )}
    </div>
  );
};

export default Favourites;
