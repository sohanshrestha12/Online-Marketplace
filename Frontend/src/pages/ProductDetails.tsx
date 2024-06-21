import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import ReactImageMagnify from "react-image-magnify";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState<string>("0");
  const [images,setImages] = useState<[string[],number]>([[],0]);
  const imgArray = [
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8fDB8fHww",
  ];
  useEffect(() => {
    setImages([imgArray,0]);
  }, []); 
  const handleImgClick=(i:number)=>{
    setImages([imgArray,i]);
  }
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
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6 gap-5 h-[450px] w-[100%] px-2 relative bg-white">
        {/* <img
           className="h-full w-full object-cover"
           src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
           alt="404 product"
         /> */}

        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "404 product",
              isFluidWidth: true,
              src: images[0][images[1]],
            },
            largeImage: {
              src: images[0][images[1]],
              width: 708,
              height: 1000,
            },
            imageStyle: {
              maxHeight: "450px",
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
        <h2 className="font-bold text-2xl capitalize">
          Pair of Shoes Kinetica 3
        </h2>
        <div className="flex justify-between mb-3">
          <div>
            <h5 className="text-sm">Ratings:</h5>
            <h5 className="text-sm">Brand: No Brand</h5>
          </div>
          <CiHeart className="text-md hover:cursor-pointer" />
        </div>
        <div className="h-[1px] z-0 bg-black opacity-15 my-2"></div>
        <div>
          <p className="text-2xl font-bold">RS. 999</p>
        </div>
        <div className="h-[1px] z-0 bg-black opacity-15 my-2"></div>
        <div>
          <p>Color</p>
        </div>
        <div>
          <p className="mb-2">Size</p>
          <div className="flex gap-2">
            <div className="py-2 px-3 rounded hover:bg-black hover:text-white hover:cursor-pointer bg-gray-50">
              <span>45</span>
            </div>
            <div className="py-2 px-3 rounded hover:bg-black hover:text-white hover:cursor-pointer bg-gray-50">
              <span>46</span>
            </div>
            <div className="py-2 px-3 rounded hover:bg-black hover:text-white hover:cursor-pointer bg-black text-white">
              <span>47</span>
            </div>
            <div className="py-2 px-3 rounded hover:bg-black hover:text-white hover:cursor-pointer bg-gray-50">
              <span>48</span>
            </div>
            <div className="py-2 px-3 rounded hover:bg-black hover:text-white hover:cursor-pointer bg-gray-50">
              <span>49</span>
            </div>
            <div className="py-2 px-3 rounded hover:bg-black hover:text-white hover:cursor-pointer bg-gray-50">
              <span>50</span>
            </div>
          </div>
        </div>
        <div>
          <p>Quantity</p>
          <div className="flex gap-2">
            <div
              className="bg-gray-50 px-3 py-2 text-2xl hover:bg-gray-200 cursor-pointer"
              onClick={decrementQuantity}
            >
              -
            </div>
            <Input
              className="w-[40px] overflow-hidden px-2"
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
        {images[0].map((img,i)=>(
          <div key={i} className="h-[130px] w-[180px]" onClick={()=>{handleImgClick(i)}}>
            <img src={img}  alt="404 product" className={`${images[1] === i?'ring-2':""} p-1 ring-blue-500 rounded h-full w-full object-cover hover:cursor-pointer`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
