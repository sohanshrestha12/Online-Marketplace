import { Input } from "@/components/ui/input";
import React from "react";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

interface AddImagesProps {
  insertImage: (files: File[]) => void;
  changeImage: (files: File[]) => void;
  insertImageUrl: (imgUrls: { url: string }[]) => void;
  images: File[];
  imageShow: { url: string }[];
  changeImageUrl: (imgUrls: { url: string }[]) => void;
  handleExistingImage?:(img:string[])=>void;
  existingImage?:string[];
}

const AddImages = ({
  insertImage,
  insertImageUrl,
  changeImage,
  images,
  imageShow,
  changeImageUrl,
  handleExistingImage,
  existingImage
}: AddImagesProps) => {
  const imageHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    const files = e.target.files;
    const length = files?.length;
    if (length && length > 0) {
      const filesArray = Array.from(files);
      insertImage(filesArray);
      const imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }

      insertImageUrl(imageUrl);
    }
  };

  const changeImg = (img: File | null, index: number) => {
    if (img) {
      const tempUrl = imageShow;
      const tempImages = images;
      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      changeImage(tempImages);
      changeImageUrl(tempUrl);
    }
  };

  const removeImg = (i:number) =>{
    const filterImage = images.filter((_,index)=> index !== i);
    const filterImageUrl = imageShow.filter((_,index)=> index !== i);
    changeImage(filterImage);
    changeImageUrl(filterImageUrl);
    if(existingImage && handleExistingImage){
      const filterExistingUrl = existingImage.filter((_,index)=>index !== i);
      handleExistingImage(filterExistingUrl); 
    }

  }

  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-black mb-4">
      {imageShow.map((img, i) => (
        <div key={i} className="h-[180px] relative">
          <label htmlFor={i.toString()} className="h-full">
            <img
              src={img.url}
              className="w-full h-full rounded-sm object-cover hover:cursor-pointer"
              alt="404 not supported image"
            />
          </label>
          <Input
            onChange={(e) =>
              changeImg(e.target.files ? e.target.files[0] : null, i)
            }
            className="hidden"
            type="file"
            id={i.toString()}
          />
          <span onClick={()=>removeImg(i)} className="p-1 hover:bg-gray-200 z-10 cursor-pointer hover:shadow-lg hover:shadow-slate-400/50 absolute top-1 right-1 rounded-full"><IoCloseSharp/></span>
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
