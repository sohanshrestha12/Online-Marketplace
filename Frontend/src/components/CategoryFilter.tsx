import { CiFilter } from "react-icons/ci";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CategoryFilter = () => {
  const shoeBrands = ["Nike", "Adidas", "Puma", "Reebok", "New Balance"];
  const colors = [
    { colorName: "Red", hexCode: "#FF0000" },
    { colorName: "Green", hexCode: "#008000" },
    { colorName: "Blue", hexCode: "#0000FF" },
    { colorName: "Yellow", hexCode: "#FFFF00" },
    { colorName: "Purple", hexCode: "#800080" },
    { colorName: "Cyan", hexCode: "#00FFFF" },
    { colorName: "Orange", hexCode: "#FFA500" },
    { colorName: "Pink", hexCode: "#FFC0CB" },
  ];
  return (
    <div>
      <h1 className="flex gap-1 items-center mb-4">
        <CiFilter className="text-xl" />
        <span className="text-lg font-bold">Filters</span>
      </h1>
      <div className="mb-4">
        <h3 className="text-md font-semibold">Brand</h3>
        <hr className="mt-1 mb-3 opacity-20" />
        {shoeBrands.map((brand, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Checkbox />
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
            min={0}
          />
          <p>-</p>
          <Input
            name="maxPrice"
            type="number"
            className="px-2"
            placeholder="Max"
            min={0}
          />
          <Button>Apply</Button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-md font-semibold">Color Family</h3>
        <hr className="mt-1 mb-3 opacity-20" />
        <div className="flex flex-wrap gap-2">
          {colors.map((color, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-gray-50 py-1 px-2 hover:font-semibold hover:bg-gray-200 rounded hover:cursor-pointer"
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
