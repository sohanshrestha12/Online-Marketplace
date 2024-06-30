import { Brand } from "@/Types/Brand";
import { fetchProductsByFilter } from "@/api/Product";
import CategoryFilter from "@/components/CategoryFilter";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchProduct } from "./ProductDetails";

const ProductLists = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<FetchProduct[]>([]);
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
//   const [checkedBrands, setCheckedBrands] = useState<string[]>(() => {
//     const storedBrands = localStorage.getItem("checkedBrands");
//     return storedBrands ? JSON.parse(storedBrands) : [];
//   });
//   const [selectedColors, setSelectedColors] = useState<string[]>(() => {
//     const storedColors = localStorage.getItem("selectedColors");
//     return storedColors ? JSON.parse(storedColors) : [];
//   });
//  const [minPrice, setMinPrice] = useState<string>(() => {
//    const storedMinPrice = localStorage.getItem("minPrice");
//    return storedMinPrice ? JSON.parse(storedMinPrice): "";
//  });

//  const [maxPrice, setMaxPrice] = useState<string>(() => {
//    const storedMaxPrice = localStorage.getItem("maxPrice");
//    return storedMaxPrice ? JSON.parse(storedMaxPrice) :"";
//  });
 const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
 const [selectedColors, setSelectedColors] = useState<string[]>([]);
 const [minPrice, setMinPrice] = useState<string>("");
 const [maxPrice, setMaxPrice] = useState<string>("");
  const handleMinPrice = (price: string) => {
    setMinPrice(price);
  };
  const handleMaxPrice = (price: string) => {
    setMaxPrice(price);
  };

  const handleColorClick = (color: string) => {
    setSelectedColors((prevSelectedColors) => {
      if (prevSelectedColors.includes(color)) {
        return prevSelectedColors.filter(
          (selectedColor) => selectedColor !== color
        );
      } else {
        return [...prevSelectedColors, color];
      }
    });
  };

  const handleBrands = (brand: string) => {
    if (checkedBrands.includes(brand)) {
      setCheckedBrands((prevBrands) =>
        prevBrands.filter((item) => item !== brand)
      );
    } else {
      setCheckedBrands((prevBrands) => [...prevBrands, brand]);
    }
  };
  useEffect(() => {
    localStorage.setItem("checkedBrands", JSON.stringify(checkedBrands));
  }, [checkedBrands]);
  useEffect(() => {
    localStorage.setItem("minPrice", JSON.stringify(minPrice));
  }, [minPrice]);
  useEffect(() => {
    localStorage.setItem("maxPrice", JSON.stringify(maxPrice));
  }, [maxPrice]);

  useEffect(() => {
    localStorage.setItem("selectedColors", JSON.stringify(selectedColors));
  }, [selectedColors]);

  const fetchProductsFilter = async (
    category?: string,
    checkedBrands?: string[],
    selectedColors?: string[],
    minPrice?: string,
    maxPrice?: string
  ) => {
    console.log("from",category,checkedBrands,selectedColors,minPrice,maxPrice)
    setLoading(true);
    try {
      const response = await fetchProductsByFilter(
        category,
        checkedBrands,
        selectedColors,
        minPrice,
        maxPrice
      );
      setFilteredProducts(response.data.data.filter);
      setAllBrands(response.data.data.categoryBrand);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setFilteredProducts([]);
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");

    if (category) {
      const normalizedCategory = category.toLowerCase().trim();
      fetchProductsFilter(
        normalizedCategory,
        checkedBrands,
        selectedColors,
        minPrice,
        maxPrice
      );
      searchParams.set("category", normalizedCategory);

      // Include brands in search params if there are checked brands
      if (checkedBrands.length > 0) {
        searchParams.set("brands", checkedBrands.join(","));
      } else {
        searchParams.delete("brands");
      }

      if (selectedColors.length > 0) {
        searchParams.set("colors", selectedColors.join(","));
      } else {
        searchParams.delete("colors");
      }

      if (minPrice !== undefined && minPrice !== "") {
        searchParams.set("minPrice", minPrice);
      } else {
        searchParams.delete("minPrice");
      }

      if (maxPrice !== undefined && maxPrice !== "") {
        searchParams.set("maxPrice", maxPrice);
      } else {
        searchParams.delete("maxPrice");
      }
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else {
      fetchProductsFilter();
    }
  }, [location.search, checkedBrands, selectedColors]);

  const handleClick = (product: FetchProduct) => {
    navigate(`/productDetails/${product._id}`);
  };

  return (
    <>
      <div className="-mt-3"></div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3 mt-2">
          <CategoryFilter
            handleBrands={handleBrands}
            checkedBrands={checkedBrands}
            allBrands={allBrands}
            handleColorClick={handleColorClick}
            selectedColors={selectedColors}
            handleMinPrice={handleMinPrice}
            handleMaxPrice={handleMaxPrice}
            minPrice={minPrice}
            maxPrice={maxPrice}
            fetchProductsFilter={fetchProductsFilter}
          />
        </div>
        {loading ? (
          "Loading..."
        ) : (
          <div className="col-span-9 grid grid-cols-12">
            {filteredProducts.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item)}
                className="col-span-3 h-[300px] hover:shadow-xl transition-shadow duration-300 ease-in-out hover:cursor-pointer"
                style={{
                  margin: "20px",
                  borderRadius: "5px",
                }}
              >
                <img
                  src={`http://localhost:5100/${item.images[0]}`}
                  alt={item.name}
                  style={{ width: "200px", height: "200px" }}
                  className="object-cover"
                />
                <div className="px-1 py-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-md">RS. {item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductLists;
