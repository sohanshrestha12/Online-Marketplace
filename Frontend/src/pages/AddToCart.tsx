import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

const AddToCart = () => {
  interface Shoe {
    _id: number;
    name: string;
    image: string;
    price: number;
  }
  const [selectedItems, setSelectedItems] = useState<Shoe[]>([]);
  const handleCheckbox = (item: Shoe) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.some((i) => i._id === item._id)) {
        return prevSelectedItems.filter((i) => i._id !== item._id);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };
  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);
  const shoeArray: Shoe[] = [
    {
      _id: 1,
      name: "Classic Sneakers",
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 59.99,
    },
    {
      _id: 2,

      name: "Running Shoes",
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      price: 89.99,
    },
    {
      _id: 3,
      name: "High-top Sneakers",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      price: 69.99,
    },
    {
      _id: 4,
      name: "Casual Slip-ons",
      image:
        "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8fDB8fHww",
      price: 49.99,
    },
  ];
  return (
    <div className="grid gap-4 grid-cols-12">
      <div className="col-span-8 flex flex-col gap-4">
        {shoeArray.map((item, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Checkbox onCheckedChange={() => handleCheckbox(item)} />
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-4">
                  <img
                    src={item.image}
                    className="w-[120px] h-[120px]"
                    alt="404 product"
                  />
                </div>
                <div className="col-span-8">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-lg font-semibold">RS. {item.price}</p>
                </div>
              </div>
            </div>
            <hr className="opacity-30" />
          </div>
        ))}
      </div>
      <div className="col-span-4">
        <Card>
          <h3 className="text-center font-semibold font-xl px-3 py-4 bg-gray-100 border-b">
            Cart
          </h3>
          <div className="px-2 py-3">
            <div className="flex justify-between">
              <h5>SubTotal Product</h5>
              <p>
                Rs.
                {selectedItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddToCart;
