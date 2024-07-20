import { addToCart } from "@/api/Cart";
import { CheckLikeStatus, DislikeProduct, LikeProduct } from "@/api/Like";
import { getProductById } from "@/api/Product";
import Comment from "@/components/Comment";
import ProductCarousel from "@/components/ProductCarousel";
import ProductDescription from "@/components/ProductDescription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export interface FetchProduct {
  _id?: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  colorFamily: string[];
  size: number[];
  quantity: number;
  rating?: number;
  videoUrl?: string;
  images: string[];
  comments?:comment[];
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

  const [quantity, setQuantity] = useState<string>("1");
  const [activeProduct, setActiveProduct] = useState<FetchProduct>();
  const [images, setImages] = useState<string[][]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

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
        console.log('active product',product);
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
  const decrementQuantity = () => {
    setQuantity((prev) =>
      (parseInt(prev) > 1 ? parseInt(prev) - 1 : 1).toString()
    );
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const segments = activeProduct?.category.split("/");
  const lastSegment = segments && segments.pop();

  const handleAddToCart = async (
    activeProduct: FetchProduct,
    quantity: string
  ) => {
    try {
      if (!activeProduct || !activeProduct._id) return;
      await addToCart(activeProduct._id, parseInt(quantity));
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
    <div className="grid grid-cols-12">
      <div className="col-span-12 -mt-6 mb-5 border-b">
        <p className="mb-2">
          {segments?.join("/")}/
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
            <h5 className="text-sm">
              Ratings:{" "}
              <span className="text-indigo-500 capitalize">no ratings</span>
            </h5>
            <h5 className="text-sm">
              Brand:{" "}
              <span className="text-indigo-500">{activeProduct?.brand}</span>
            </h5>
          </div>
          {isLiked ? (
            <IoMdHeart
              onClick={dislikeProduct}
              className="text-md hover:cursor-pointer"
            />
          ) : (
            <CiHeart
              onClick={likeProduct}
              className="text-md hover:cursor-pointer"
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
              style={{ background: `${color}` }}
              className="h-[30px] w-[30px] rounded"
            ></div>
          ))}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <p className="mb-2">Sizes:</p>
          <div className="flex gap-2">
            {activeProduct?.size.map((item, i) => (
              <div
                key={i}
                className="py-2 px-3 rounded hover:bg-black hover:text-white hover:cursor-pointer bg-gray-50"
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
                className="w-[60px]  text-center overflow-hidden px-2 text-black"
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
          <div className="basis-1/2 flex justify-center font-semibold hover:cursor-pointer items-center bg-[#f85606] text-white py-2">
            Buy Now
          </div>
          <Button
            disabled={activeProduct && activeProduct?.quantity <= 0}
            onClick={() => {
              if (activeProduct) {
                handleAddToCart(activeProduct, quantity);
              }
            }}
            className="basis-1/2 flex justify-center font-semibold hover:cursor-pointer items-center bg-black text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="flex gap-3 col-span-6 mt-5">
        <ProductCarousel
          images={images[0]}
          handleClick={handleImgClick}
          selectedImageIndex={selectedImageIndex}
        />
      </div>
      {activeProduct && (
        <div className="col-span-12 mt-5 py-2">
          <ProductDescription activeProduct={activeProduct} />
        </div>
      )}

      {activeProduct && activeProduct._id && (
        <div className="col-span-12 mt-4">
          <Comment product={activeProduct} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
