import { addToCart } from "@/api/Cart";
import { CheckLikeStatus, DislikeProduct, LikeProduct } from "@/api/Like";
import { getProductById } from "@/api/Product";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import BuyNowDialog from "@/components/BuyNowDialog";
import Comment from "@/components/Comment";
import PersonalChat from "@/components/PersonalChat";
import ProductCarousel from "@/components/ProductCarousel";
import ProductDescription from "@/components/ProductDescription";
import RatingStars from "@/components/RatingsStar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProduct } from "@/contexts/ProductContext";
import { useSocket } from "@/contexts/SocketContext";
import { Profile } from "@/Types/User";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import ReactImageMagnify from "react-image-magnify";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface comment {
  _id: string;
  content: string;
  user: Profile;
}
export interface rating {
  _id?: string;
  user: string;
  rating: number;
}
export interface FetchProduct {
  _id?: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  colorFamily: string[];
  createdBy?: Profile;
  size: number[];
  quantity: number;
  rating?: rating[];
  videoUrl?: string;
  images: string[];
  comments?: comment[];
  createdAt?:string;
}

export interface FetchFilterProduct {
  page: number;
  product: FetchProduct[];
  totalPage: number;
  totalProduct: number;
  limit: number;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const auth = useAuth();

  const [quantity, setQuantity] = useState<string>("1");
  const [activeProduct, setActiveProduct] = useState<FetchProduct>();
  const [images, setImages] = useState<string[][]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");
  const { showChat, toggleChat,handleMessageSubmit } = useProduct();
  const [isBuyNowDialogOpen, setBuyNowDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<number>(-1);
  const [selectedSize, setSelectedSize] = useState<number>(-1);
  const [averageRating, setAverageRating] = useState<number>(0);

  const { socket } = useSocket();

  const [loading, setLoading] = useState<boolean>(true);

  const handleBuyNowDialogOpen = () => {
    setBuyNowDialogOpen(true);
  };
  const handleBuyNowDialogClose = () => {
    setBuyNowDialogOpen(false);
  };

  const handleSelectColor = (index: number) => {
    setSelectedColor(index);
  };

  const handleSelectSize = (index: number) => {
    setSelectedSize(index);
  };


  useEffect(() => {
    if (socket) {
      console.log('going here in product')
      if (activeProduct && activeProduct.createdBy && user) {
        if (activeProduct.createdBy._id !== user._id) {
          setRoomId(
            `${activeProduct._id}-${activeProduct.createdBy._id}-${user._id}`
          );
          if(roomId){
            socket.emit("joinPrivateRoom", roomId);
          }
        }
      }
    
      return () => {
        socket.off("joinPrivateRoom");
      };
    }
  }, [activeProduct, user, socket]);
  useEffect(() => {
    if (!activeProduct) return;
    if (activeProduct.rating && activeProduct.rating.length > 0) {
      const totalRating = activeProduct.rating.reduce(
        (sum, r) => sum + r.rating,
        0
      );
      const avgRating = totalRating / activeProduct.rating.length;
      setAverageRating(avgRating);
    } else {
      setAverageRating(0);
    }
  }, [activeProduct, activeProduct && activeProduct.rating, user]);




  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        if (!activeProduct || !activeProduct._id) return;
        const response = await CheckLikeStatus(activeProduct._id);
        setIsLiked(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    checkLikedStatus();
  }, [activeProduct]);
  const updateRating = (rating: rating) => {
    setActiveProduct((prev) => {
      if (!prev) return prev;
      const existingRatingIndex = prev.rating?.findIndex(
        (item) => item.user === user?._id
      );

      if (
        existingRatingIndex !== undefined &&
        existingRatingIndex !== -1 &&
        prev.rating
      ) {
        const updatedRatings = [...prev.rating];
        updatedRatings[existingRatingIndex] = rating;
        return {
          ...prev,
          rating: updatedRatings,
        };
      } else {
        return {
          ...prev,
          rating: prev.rating ? [...prev.rating, rating] : [rating],
        };
      }
    });
  };
  const updateActiveProductQuantity = (updatedActiveProduct: FetchProduct) => {
    // setActiveProduct((prevProduct)=>
    //   prevProduct?._id == updatedActiveProduct._id?{...prevProduct,quantity:updatedActiveProduct.quantity}:prevProduct
    // )
    setActiveProduct((prevProduct) => {
      if (prevProduct && prevProduct._id === updatedActiveProduct._id) {
        return { ...prevProduct, quantity: updatedActiveProduct.quantity };
      }
      return prevProduct;
    });
  };

  const likeProduct = async () => {
    try {
      if (!activeProduct || !activeProduct._id) return;
      await LikeProduct(activeProduct._id);
      setIsLiked(true);
      toast.success("Added to your favourites");
    } catch (error) {
      console.log(error);
    }
  };

  const dislikeProduct = async () => {
    try {
      if (!activeProduct || !activeProduct._id) return;
      await DislikeProduct(activeProduct._id);
      setIsLiked(false);
      toast.success("Removed from your favourites");
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const getProductFromId = async () => {
      try {
        if (!id) {
          return null;
        }
        const product = await getProductById(id);
        console.log("active product", product);
        if (product) {
          setActiveProduct(product.data.data);
          setImages([product.data.data.images || []]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    };

    getProductFromId();
  }, [id, navigate]);

  const handleImgClick = (i: number) => {
    setSelectedImageIndex(i);
  };
  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const maxQuantity =
      activeProduct && activeProduct.quantity > 0 ? activeProduct.quantity : 1;
    if (value === "") {
      setQuantity("1");
    }
    const parsedValue = parseInt(value);
    console.log(maxQuantity);
    if (isNaN(parsedValue)) {
      setQuantity("1");
    } else if (parsedValue > maxQuantity) {
      setQuantity(maxQuantity.toString());
    } else if (parsedValue < 1) {
      setQuantity("1");
    } else {
      setQuantity(value);
    }
  };
  const incrementQuantity = () => {
    if (!activeProduct) return;
    setQuantity((prev) =>
      activeProduct.quantity > parseInt(quantity)
        ? (parseInt(prev) + 1).toString()
        : prev
    );
  };
   useEffect(() => {
     console.log("This is the selected color value",selectedColor);
   }, [selectedColor]);
  const decrementQuantity = () => {
    setQuantity((prev) =>
      (parseInt(prev) > 1 ? parseInt(prev) - 1 : 1).toString()
    );
  };
  if (loading) {
    return <div>Loading...</div>;
  }

 
  const segments = activeProduct?.category.split("/");
  console.log(segments);
  const firstSegment = segments && segments[0];
  const middleSegment = segments && segments[1];
  const lastSegment = segments && segments.pop();

  const handleAddToCart = async (
    activeProduct: FetchProduct,
    quantity: string
  ) => {
    try {
      if (!activeProduct || !activeProduct._id || selectedColor === -1 || selectedSize === -1) return;
      await addToCart(activeProduct._id, parseInt(quantity),activeProduct.colorFamily[selectedColor],activeProduct.size[selectedSize]);
      setActiveProduct((prevProduct) => {
        if (!prevProduct) return prevProduct;
        const newQuantity = prevProduct.quantity - parseInt(quantity);
        return {
          ...prevProduct,
          quantity: newQuantity < 1 ? 0 : newQuantity,
        };
      });
      setQuantity("1");
      // setActiveProduct();
      toast.success("Added to the cart successfully");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div className="grid grid-cols-12 dark:text-white ">
      <div className="col-span-12 -mt-6 mb-5 border-b">
        <p className="mb-2 dark:text-white">
          <span>{firstSegment+"/"}</span>
          <span className="hover:cursor-pointer" onClick={()=>navigate(`/productLists?category=${middleSegment}`)}>{middleSegment+"/"}</span>
          <span className="text-[#f85606]">{lastSegment}</span>
        </p>
      </div>
      <div className="col-span-6 gap-5 h-[450px] w-[100%] px-2 relative bg-white">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "404 product",
              isFluidWidth: true,
              src: `http://localhost:5100/${images[0][selectedImageIndex]}`,
              height: 450,
            },
            largeImage: {
              src: `http://localhost:5100/${images[0][selectedImageIndex]}`,
              width: 708,
              height: 1000,
            },
            imageStyle: {
              maxHeight: "450px",
              width: "100%",
              height: "100%",
              maxWidth: "80%",
              objectFit: "contain",
              zIndex: 9,
            },
            enlargedImageContainerDimensions: {
              width: "110%",
              height: "100%",
            },
            enlargedImageContainerStyle: {
              zIndex: 10,
              backgroundColor: "white",
            },
            enlargedImageStyle: {
              objectFit: "contain",
              width: "100%",
              height: "100%",
            },
          }}
        />
      </div>

      <div className="col-span-6 p-2">
        <h2 className="font-bold text-2xl capitalize">{activeProduct?.name}</h2>
        <div className="flex justify-between mb-3">
          <div>
            <h5 className="text-sm flex gap-1 items-center">
              Ratings:{" "}
              <span className="text-indigo-500 capitalize">
                <RatingStars rating={averageRating} />
              </span>
            </h5>
            <h5 className="text-sm">
              Brand:{" "}
              <span className="text-indigo-500">{activeProduct?.brand}</span>
            </h5>
          </div>
          {isLiked ? (
            <IoMdHeart
              onClick={dislikeProduct}
              className="text-xl hover:cursor-pointer"
            />
          ) : (
            <CiHeart
              onClick={likeProduct}
              className="text-xl hover:cursor-pointer"
            />
          )}
        </div>
        <div className="h-[1px] z-0 bg-black opacity-15 my-3"></div>
        <div>
          <p className="text-4xl font-semibold text-[#f85606]">
            RS. {activeProduct?.price}
          </p>
        </div>
        <div className="h-[1px] z-0 bg-black opacity-15 my-3"></div>
        <div className="flex gap-3 mb-4 items-center">
          <p>Available Colors:</p>
          {activeProduct?.colorFamily.map((color, i) => (
            <div
              key={i}
              onClick={() => handleSelectColor(i)}
              className={`hover:border-[1px] border-black dark:!border-white rounded px-[2px] py-[1px] hover:cursor-pointer h-[35px] w-[35px] flex justify-center items-center ${
                selectedColor === i ? "border-[1px]" : ""
              }`}
            >
              <div
                style={{ background: `${color}` }}
                className="h-[30px] w-[30px] rounded"
              ></div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <p className="mb-2">Sizes:</p>
          <div className="flex gap-2">
            {activeProduct?.size.map((item, i) => (
              <div
                key={i}
                onClick={() => handleSelectSize(i)}
                className={`py-2 px-3 rounded hover:bg-black hover:text-white dark:!bg-slate-700 dark:hover:!bg-slate-950 hover:cursor-pointer bg-gray-50 ${
                  selectedSize === i
                    ? "bg-black text-white dark:!bg-slate-950"
                    : ""
                }`}
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p>Quantity</p>
          <div className="flex gap-2">
            <div>
              <Button
                disabled={
                  (activeProduct && activeProduct?.quantity <= 1) ||
                  parseInt(quantity) <= 1
                }
                variant={"outline"}
                onClick={decrementQuantity}
                className="bg-gray-50 px-3 py-2 text-2xl hover:bg-gray-200 cursor-pointer"
              >
                -
              </Button>
            </div>
            <div>
              <Input
                className="w-[60px]  text-center overflow-hidden px-2 text-black dark:!text-white"
                value={quantity}
                onChange={handleQuantity}
                type="number"
                name="quantity"
                max={activeProduct?.quantity}
                min={1}
              />
            </div>
            <div>
              <Button
                variant={"outline"}
                disabled={
                  (activeProduct && activeProduct?.quantity <= 1) ||
                  (activeProduct &&
                    parseInt(quantity) >= activeProduct.quantity)
                }
                onClick={incrementQuantity}
                className="bg-gray-50 px-3 py-2 text-2xl hover:bg-gray-200 cursor-pointer"
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <Button
            onClick={handleBuyNowDialogOpen}
            disabled={
              (activeProduct && activeProduct.quantity < 1) ||
              selectedColor === -1 ||
              selectedSize === -1
            }
            className="basis-1/2 flex justify-center font-semibold hover:cursor-pointer items-center bg-[#f85606] hover:bg-[#f85606] text-white dark:bg-[#f85606] dark:hover:bg-[#f85606] py-2"
          >
            Buy Now{" "}
            {activeProduct && activeProduct.quantity < 1
              ? "(Currently out of stock.)"
              : ""}
          </Button>
          <Button
            disabled={activeProduct && activeProduct?.quantity <= 0}
            onClick={() => {
              if (activeProduct) {
                handleAddToCart(activeProduct, quantity);
              }
            }}
            className="basis-1/2 flex justify-center font-semibold hover:cursor-pointer items-center bg-black dark:hover:!bg-slate-950 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="gap-3 grid grid-cols-12 col-span-12 mt-5">
        <div className="col-span-6">
          <ProductCarousel
            images={images[0]}
            handleClick={handleImgClick}
            selectedImageIndex={selectedImageIndex}
          />
        </div>
        {activeProduct?.createdBy?._id !== user?._id && (
          <div className="flex gap-3 col-span-6 mt-5">
            <Button type="button" onClick={toggleChat} className="dark:!bg-slate-700 dark:hover:!bg-slate-900 dark:text-white">
              Contact with Seller
            </Button>
          </div>
        )}
      </div>
      {activeProduct && (
        <div className="col-span-12 mt-5 py-2">
          <ProductDescription activeProduct={activeProduct} />
        </div>
      )}

      {activeProduct && activeProduct._id && (
        <div className="col-span-12 mt-4">
          <Comment product={activeProduct} updateRating={updateRating} />
        </div>
      )}
      {
        showChat && (
          <PersonalChat
            activeProduct={activeProduct!}
            toggleChat={toggleChat}
            socket={socket!}
            {...(auth.roomId ? { roomId: auth.roomId } : { roomId })}
            user={user!}
            handleMessageSubmit={handleMessageSubmit}
          />
        )
        //  (
        //   <div className="h-[450px] w-[380px] rounded-t-md flex flex-col fixed bottom-0 right-10 shadow z-10 bg-white" >
        //     <div className="p-3 flex gap-2 items-center  justify-between bg-blue-600 rounded">
        //       <div className="flex gap-3 items-center">
        //         <img
        //           src={`http://localhost:5100/${activeProduct?.createdBy?.profileImage}`}
        //           className="rounded-full object-contain h-[40px] w-[40px]"
        //           alt="404 profile not found"
        //         />
        //         <h5 className="text-lg font-semibold capitalize text-white">
        //           {activeProduct?.createdBy?.username}
        //         </h5>
        //       </div>
        //       <div
        //         className="p-2 hover:cursor-pointer group"
        //         onClick={toggleChat}
        //       >
        //         <IoClose className="text-white text-xl -mt-6 -mr-3 transition-all group-hover:!text-gray-200" />
        //       </div>
        //     </div>
        //     <div className="flex-1 h-full">Content</div>
        //     <div className="h-fit mb-2 flex items-center bg-gray-100 text-black">
        //       <Formik initialValues={initialValue} onSubmit={handleMessageSubmit}>
        //         <Form className="relative w-full">
        //           <Field
        //             className="focus-visible:outline-none focus-visible:ring-offset-transparent focus-visible:ring-none focus:border-none focus-visible:ring-offset-0 focus-visible:box-shadow-none focus-visible:border-none "
        //             placeholder="Enter your message"
        //             name="message"
        //             as={Input}
        //           />
        //           <div className="absolute flex items-center top-[50%] transform -translate-y-[50%] right-3">
        //             <button type="submit" className="p-0 m-0 flex items-center">
        //               <ToolTip name="Send">
        //                 <IoSend className="text-lg" />
        //               </ToolTip>
        //             </button>
        //           </div>
        //         </Form>
        //       </Formik>
        //     </div>
        //   </div>
        // )
      }
      <BuyNowDialog
        activeProduct={activeProduct}
        isOpen={isBuyNowDialogOpen}
        onClose={handleBuyNowDialogClose}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        quantity={quantity}
        updateActiveProductQuantity={updateActiveProductQuantity}
      />
    </div>
  );
};

export default ProductDetails;
