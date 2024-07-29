import { Brand } from "@/Types/Brand";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

export interface Colors {
  colorName: string;
  hexCode: string;
}
interface FilteredProducts {
  handleBrands: (brand: string) => void;
  checkedBrands: string[];
  allBrands: Brand[];
  handleColorClick: (color: string) => void;
  selectedColors: string[];
  handleMinPrice: (price: string) => void;
  handleMaxPrice: (price: string) => void;
  maxPrice: string;
  minPrice: string;
  fetchProductsFilter:( category?: string,
      checkedBrands?: string[],
      selectedColors?: string[],
      minPrice?:string,
      maxPrice?:string)=>void;
}

const CategoryFilter = ({
  handleBrands,
  checkedBrands,
  allBrands,
  handleColorClick,
  selectedColors,
  handleMinPrice,
  handleMaxPrice,
  minPrice,
  maxPrice,
  fetchProductsFilter,
}: FilteredProducts) => {
  const [category, setCategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);

  const colors: Colors[] = [
    { colorName: "Red", hexCode: "#FF0000" },
    { colorName: "Green", hexCode: "#00FF00" },
    { colorName: "Blue", hexCode: "#0000FF" },
    { colorName: "Yellow", hexCode: "#FFFF00" },
    { colorName: "Orange", hexCode: "#FFA500" },
    { colorName: "Purple", hexCode: "#800080" },
    { colorName: "Pink", hexCode: "#FFC0CB" },
    { colorName: "Brown", hexCode: "#A52A2A" },
    { colorName: "Black", hexCode: "#000000" },
    { colorName: "White", hexCode: "#FFFFFF" },
    { colorName: "Gray", hexCode: "#808080" },
    { colorName: "Gold", hexCode: "#FFD700" },
    { colorName: "Silver", hexCode: "#C0C0C0" },
    { colorName: "Bronze", hexCode: "#CD7F32" },
    { colorName: "Lavender", hexCode: "#E6E6FA" },
    { colorName: "Mint", hexCode: "#98FF98" },
    { colorName: "Peach", hexCode: "#FFDAB9" },
    { colorName: "Neon Pink", hexCode: "#FF1493" },
    { colorName: "Neon Green", hexCode: "#39FF14" },
    { colorName: "Neon Yellow", hexCode: "#FFFF00" },
    { colorName: "Neon Orange", hexCode: "#FFA500" },
    { colorName: "Earth Brown", hexCode: "#8B4513" },
    { colorName: "Earth Green", hexCode: "#556B2F" },
    { colorName: "Earth Gray", hexCode: "#A9A9A9" },
  ];
  const uniqueBrands = Array.from(
    new Set(allBrands.map((brand) => brand.name))
  );
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category") || "";
    setCategory(category);
    const brands = searchParams.get("brands") || "";
    const brandsArray = brands
      ? brands.split(",").map((brand) => brand.trim())
      : [];
    setSelectedBrands(brandsArray);
    const colorFamily = searchParams.get("colors") || "";
    const colorsArray = colorFamily
      ? colorFamily.split(",").map((color) => color.trim())
      : [];
    setSelectedColor(colorsArray);
  }, [location]);
  return (
    <div>
      <h1 className="flex gap-1 items-center mb-4">
        <CiFilter className="text-xl" />
        <span className="text-lg font-bold">Filters</span>
      </h1>
      <div className="mb-4">
        <h3 className="text-md font-semibold">Brand</h3>
        <hr className="mt-1 mb-3 opacity-20" />
        {uniqueBrands.map((brand, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Checkbox
              checked={checkedBrands.includes(brand)}
              onClick={() => handleBrands(brand)}
            />
            <p className="mb-1">{brand}</p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-md font-semibold">Price</h3>
        <hr className="mt-1 mb-3 opacity-20" />
        <div className="flex gap-2 items-center">
          <Input
            name="minPrice"
            type="number"
            className="px-2"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => handleMinPrice(e.target.value)}
            min={0}
          />
          <p>-</p>
          <Input
            name="maxPrice"
            type="number"
            className="px-2"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => handleMaxPrice(e.target.value)}
            min={0}
          />
          <Button onClick={()=>fetchProductsFilter(category,selectedBrands,selectedColor,minPrice,maxPrice)}>Apply</Button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-md font-semibold">Color Family</h3>
        <hr className="mt-1 mb-3 opacity-20" />
        <div className="flex flex-wrap gap-2">
          {colors.map((color, i) => (
            <div
              key={i}
              onClick={() => handleColorClick(color.hexCode)}
              style={{
                border: selectedColors.includes(color.hexCode)
                  ? "1px solid #f85606"
                  : "none",
              }}
              className={`${
                selectedColors.includes(color.hexCode)
                  ? "bg-gray-200 font-semibold"
                  : "bg-gray-50"
              } flex items-center gap-2 bg-gray-50 py-1 px-2 hover:font-semibold hover:bg-gray-200 rounded hover:cursor-pointer`}
            >
              <div
                className="h-[12px] w-[12px] rounded-sm"
                style={{ backgroundColor: `${color.hexCode}` }}
              ></div>
              <p className="text-sm">{color.colorName}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <h3 className="text-md font-semibold">Rating</h3>
        <hr className="mt-1 mb-3 opacity-20" />
      </div>
    </div>
  );
};

export default CategoryFilter;
