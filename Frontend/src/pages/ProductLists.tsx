import CategoryFilter from "@/components/CategoryFilter";
import { useEffect, useState } from "react";

const ProductLists = () => {
  interface Shoe {
    name: string;
    image: string;
    price: number;
  }
  const [shoes, setShoes] = useState<Shoe[]>([]);

  const shoeArray: Shoe[] = [
    {
      name: "Classic Sneakers",
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 59.99,
    },
    {
      name: "Running Shoes",
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      price: 89.99,
    },
    {
      name: "High-top Sneakers",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      price: 69.99,
    },
    {
      name: "Casual Slip-ons",
      image:
        "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8fDB8fHww",
      price: 49.99,
    },
    {
      name: "Classic Sneakers",
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 59.99,
    },
    {
      name: "Running Shoes",
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      price: 89.99,
    },
    {
      name: "High-top Sneakers",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      price: 69.99,
    },
    {
      name: "Casual Slip-ons",
      image:
        "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8fDB8fHww",
      price: 49.99,
    },
  ];

  useEffect(() => {
    setShoes(shoeArray);
  }, []);
  return (
    <>
      <div className="-mt-3">
        <h2 className="capitalize cursor-pointer">
          Home / Men Clothes / Fashion / Shoes
        </h2>
        <div className="h-[1px] bg-black opacity-10 my-2"></div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3 mt-2">
          <CategoryFilter/>
        </div>
        <div className="col-span-9 grid grid-cols-12">
          {shoes.map((shoe, index) => (
            <div
              key={index}
              className="col-span-3 hover:shadow-xl transition-shadow duration-300 ease-in-out hover:cursor-pointer"
              style={{
                margin: "20px",
                borderRadius: "5px",
              }}
            >
              <img
                src={shoe.image}
                alt={shoe.name}
                style={{ width: "200px", height: "200px" }}
              />
              <div className="px-1 py-2">
                <h3 className="font-semibold">{shoe.name}</h3>
                <p className="text-md">RS. {shoe.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductLists;
