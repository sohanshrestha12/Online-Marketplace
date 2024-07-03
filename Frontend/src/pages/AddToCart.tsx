import { getCartItems } from "@/api/Cart";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { FetchProduct } from "./ProductDetails";

const AddToCart = () => {

  const [selectedItems, setSelectedItems] = useState<FetchProduct[]>([]);
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
    userId:string,
    productId:FetchProduct,
    quantity:number
  }
  const [cartItems,setCartItems] = useState<CartItems[]>([]);

  useEffect(()=>{
    const fetchCartItems = async()=>{
      try {
        const response =await getCartItems();
        setCartItems(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCartItems();
  },[]);


  return (
    <div className="grid gap-4 grid-cols-12">
      <div className="col-span-8 flex flex-col gap-4">
        {cartItems.map((item, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Checkbox
                onCheckedChange={() => handleCheckbox(item.productId)}
              />
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-4">
                  <img
                    src={`http://localhost:5100/${item.productId.images[0]}`}
                    className="w-[120px] h-[120px]"
                    alt="404 product"
                  />
                </div>
                <div className="col-span-8">
                  <p className="text-lg font-semibold">{item.productId.name}</p>
                  <p className="text-lg font-semibold">RS. {item.productId.price}</p>
                  <p className="text-lg font-semibold">Quantity: {item.quantity}</p>
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
                {selectedItems
                  .reduce((total, item) => total + item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddToCart;
