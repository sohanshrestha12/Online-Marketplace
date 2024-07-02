import { getProductById } from "@/api/Product";
import ProductCarousel from "@/components/ProductCarousel";
import ProductDescription from "@/components/ProductDescription";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import ReactImageMagnify from "react-image-magnify";
import { useNavigate, useParams } from "react-router-dom";

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
}

export interface FetchFilterProduct{
  page:number,
  product:FetchProduct[],
  totalPage:number,
  totalProduct:number,
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState<string>("0");
  const [activeProduct, setActiveProduct] = useState<FetchProduct>();
  const [images, setImages] = useState<string[][]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProductFromId = async () => {
      try {
        if (!id) {
          return null;
        }
        const product = await getProductById(id);
        console.log(product);
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
    const input = event.target.value;
    setQuantity(input);
  };
  const incrementQuantity = () => {
    setQuantity((prev) => (parseInt(prev) + 1).toString());
  };
  const decrementQuantity = () => {
    setQuantity((prev) =>
      (parseInt(prev) > 0 ? parseInt(prev) - 1 : 0).toString()
    );
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const segments = activeProduct?.category.split("/");
  const lastSegment = segments && segments.pop();

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
          <CiHeart className="text-md hover:cursor-pointer" />
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
            <div
              className="bg-gray-50 px-3 py-2 text-2xl hover:bg-gray-200 cursor-pointer"
              onClick={decrementQuantity}
            >
              -
            </div>
            <Input
              className="w-[40px] text-center overflow-hidden px-2"
              value={quantity}
              onChange={handleQuantity}
              type="text"
              name="quantity"
            />
            <div
              className="bg-gray-50 px-3 py-2 text-2xl hover:bg-gray-200 cursor-pointer"
              onClick={incrementQuantity}
            >
              +
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <div className="basis-1/2 flex justify-center font-semibold hover:cursor-pointer items-center bg-[#f85606] text-white py-2">
            Buy Now
          </div>
          <div className="basis-1/2 flex justify-center font-semibold hover:cursor-pointer items-center bg-black text-white">
            Add to Cart
          </div>
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
    </div>
  );
};

export default ProductDetails;
