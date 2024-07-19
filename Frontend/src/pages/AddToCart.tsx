import { getCartItems } from "@/api/Cart";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { FetchProduct } from "./ProductDetails";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AddToCart = () => {
  const [selectedItems, setSelectedItems] = useState<FetchProduct[]>([]);
  const navigate = useNavigate();
  const handleCheckbox = (item: FetchProduct) => {
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

  interface CartItems {
    userId: string;
    productId: FetchProduct;
    quantity: number;
  }
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        setCartItems(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-12">
      <div className="col-span-8 flex flex-col gap-1">
        {cartItems.map((item, i) => (
          <div key={i} className="flex flex-col gap-1 py-1 ">
            <div className="flex gap-4 hover:bg-gray-50 py-3 px-2 rounded ">
              <Checkbox
                onCheckedChange={() => handleCheckbox(item.productId)}
              />
              <div className="grid grid-cols-12 gap-3 w-full">
                <div className="col-span-2">
                  <img
                    src={`http://localhost:5100/${item.productId.images[0]}`}
                    className="w-[80px] h-[80px] object-contain"
                    alt="404 product"
                  />
                </div>
                <div className="col-span-6">
                  <p
                    className="text-md capitalize hover:cursor-pointer font-semibold"
                    onClick={() => {
                      navigate(`/productDetails/${item.productId._id}`);
                    }}
                  >
                    {item.productId.name}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-lg font-semibold text-[#f85606]">
                    RS.{item.productId.price}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-md font-semibold">
                    <span className="text-gray-500">Qty: </span>
                    {item.productId.quantity}
                  </p>
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
          <div className="px-2 py-3 text-md">
            <div className="mb-3 text-md font-semibold">
              <h6>Order Summary</h6>
            </div>
            <div className="flex justify-between text-gray-800">
              <h5>SubTotal ({selectedItems.length + " items"})</h5>
              <p>
                Rs.{" "}
                {selectedItems
                  .reduce((total, item) => total + item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-gray-800 mt-2">
              <p>Total</p>
              {
                <p>
                  Rs.{" "}
                  {selectedItems
                    .reduce((total, item) => total + item.price, 0)
                    .toFixed(2)}
                </p>
              }
            </div>
            <div className="mt-4 w-full flex">
              <Button variant={"orange"} className="flex-1">
                Proceed To Checkout({selectedItems.length})
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddToCart;
