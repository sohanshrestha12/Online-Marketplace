import { getCartItems, removeCartItems } from "@/api/Cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchProduct } from "./ProductDetails";
import { MdDelete } from "react-icons/md";
import CartDeleteDialog from "@/components/CartDeleteDialog";
import { toast } from "sonner";

const AddToCart = () => {
  interface CartItems {
    _id?: string;
    userId: string;
    productId: FetchProduct;
    quantity: number;
    selectedColor: string;
    selectedSize: number;
  }
  const [selectedItems, setSelectedItems] = useState<CartItems[]>([]);
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [activeDeleteCartItem, setActiveDeleteCartItem] = useState<CartItems>();

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const updateCartItems = (cartItems:CartItems) =>{
    setCartItems((prevItems)=>{
      const filteredItems = prevItems.filter((item)=>item._id !== cartItems._id);
      return filteredItems;
    })
  }


  const handleDeleteCart = async() => {
    if (!activeDeleteCartItem || !activeDeleteCartItem._id) return;
    try {
      const response = await removeCartItems(activeDeleteCartItem._id);
      toast.success('Successfully deleted the cart item');
      updateCartItems(response.data.data);
      handleDeleteDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (item: CartItems) => {
    setSelectedItems((prevSelectedItems) => {
      if (
        prevSelectedItems.some(
          (i) =>
            i.productId._id === item.productId._id &&
            i.selectedColor === item.selectedColor &&
            i.selectedSize === item.selectedSize
        )
      ) {
        return prevSelectedItems.filter(
          (i) =>
            !(
              i.productId._id === item.productId._id &&
              i.selectedColor === item.selectedColor &&
              i.selectedSize === item.selectedSize
            )
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };
  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        setCartItems(response.data.data);
        console.log("cart items", response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-12">
      <div className="col-span-7 flex flex-col gap-1">
        {cartItems.length >= 1 ? (
          cartItems.map((item, i) => (
            <div key={i} className="flex flex-col gap-1 -ml-[50px] py-1 ">
              <div
                className={`flex gap-4 hover:bg-gray-50 pb-3 px-2 rounded ${
                  i === 0 ? "" : "mt-2"
                } `}
              >
                <Checkbox onCheckedChange={() => handleCheckbox(item)} />
                <div className="grid grid-cols-12 gap-3 w-full">
                  <div className="col-span-2 rounded-sm">
                    <img
                      src={`http://localhost:5100/${item.productId.images[0]}`}
                      className="w-full h-full rounded-sm object-contain"
                      alt="404 product"
                    />
                  </div>
                  <div className="col-span-6">
                    <p
                      className="text-md capitalize hover:cursor-pointer font-semibold break-words line-clamp-2"
                      onClick={() => {
                        navigate(`/productDetails/${item.productId._id}`);
                      }}
                    >
                      {item.productId.name}
                    </p>
                    <div className="flex gap-3">
                      <p className="font-semibold flex gap-1 items-center text-sm mt-[10px]">
                        Color:{" "}
                        <span
                          style={{
                            backgroundColor: item.selectedColor,
                            height: "13px",
                            width: "13px",
                            display: "flex",
                            borderRadius: "50%",
                          }}
                        ></span>
                      </p>
                      <p className=" font-semibold flex gap-1 items-center text-sm mt-[10px]">
                        Size: <Badge>{item.selectedSize + " "}cm</Badge>
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-lg font-semibold text-[#f85606]">
                      RS.{item.productId.price}
                    </p>
                  </div>
                  <div className="col-span-2 flex flex-col space-between gap-3 h-[100%]">
                    <p className="text-md font-semibold">
                      <span className="text-gray-500 text-center self-center">
                        Qty:{" "}
                      </span>
                      {item.quantity}
                    </p>
                    <MdDelete
                      onClick={() => {
                        handleDeleteDialogOpen();
                        setActiveDeleteCartItem(item);
                      }}
                      className="self-center text-2xl text-red-600 hover:cursor-pointer hover:!text-red-500"
                    />
                  </div>
                </div>
              </div>
              <hr className="opacity-30" />
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center">
            No Items in Cart Yet
          </p>
        )}
      </div>
      <div className="col-span-5">
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
                  .reduce((total, item) => total + item.productId.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-gray-800 mt-2">
              <p>Total</p>
              {
                <p>
                  Rs.{" "}
                  {selectedItems
                    .reduce((total, item) => total + item.productId.price, 0)
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
        <CartDeleteDialog
          isOpen={isDeleteDialogOpen}
          onOpen={handleDeleteDialogClose}
          handleDeleteCart={handleDeleteCart}
        />
      </div>
    </div>
  );
};

export default AddToCart;
