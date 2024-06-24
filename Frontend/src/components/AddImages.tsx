import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { BsImages } from "react-icons/bs";
const AddImages = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageShow, setImageShow] = useState<{ url: string }[]>([]);
  const imageHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    const files = e.target.files;
    const length = files?.length;
    if (length && length > 0) {
      setImages([...images, ...files]);
      const imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const changeImage = (img: File | null, index: number) => {
    if (img) {
      const tempUrl = imageShow;
      const tempImages = images;
      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImages([...tempImages]);
      setImageShow([...tempUrl]);
    }
  };
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-black mb-4">
      {imageShow.map((img, i) => (
        <div key={i} className="h-[180px] relative">
          <label htmlFor={i.toString()}>
            <img
              src={img.url}
              className="w-full h-full rounded-sm object-cover hover:cursor-pointer"
              alt="404 not supported image"
            />
          </label>
          <Input
            onChange={(e) =>
              changeImage(e.target.files ? e.target.files[0] : null, i)
            }
            className="hidden"
            type="file"
            id={i.toString()}
          />
        </div>
      ))}
      <label
        className="flex justify-center items-center flex-col h-[180px] cursor-pointer border !border-dashed hover:border-indigo-500 w-full text-black"
        htmlFor="image"
      >
        <span>
          <BsImages />{" "}
        </span>
        <span>select image</span>
      </label>
      <Input
        multiple
        onChange={imageHandle}
        className="hidden"
        type="file"
        id="image"
      ></Input>
    </div>
  );
};

export default AddImages;
