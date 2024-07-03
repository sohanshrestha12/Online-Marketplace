import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardTitle } from "./ui/card";
import { FetchProduct } from "@/pages/ProductDetails";
import { DialogTitle } from "@radix-ui/react-dialog";
import AddImages from "./AddImages";
import { useState } from "react";

interface UpdateProps {
  isOpen: boolean;
  onClose: () => void;
  product: FetchProduct;
}

const Update = ({ isOpen, onClose, product }: UpdateProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [imageShow, setImageShow] = useState<{ url: string }[]>([]);
  const insertImage = (files: File[]) => {
    setImages([...images, ...files]);
  };
  const changeImage = (tempImages: File[]) => {
    setImages([...tempImages]);
  };
  const insertImageUrl = (imgUrl: { url: string }[]) => {
    setImageShow([...imageShow, ...imgUrl]);
  };
  const changeImageUrl = (imgUrl: { url: string }[]) => {
    setImageShow([...imgUrl]);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-80 max:w-full sm:w-full  sm:max-w-[80rem]">
        <DialogTitle>Update</DialogTitle>
        <Card>
          <CardTitle className="bg-gray-50 px-2 py-3 border-b text-md font-semibold">
            Basic Information
          </CardTitle>
          <div className="p-3">
            <div className="mb-2">
              <p className="font-semibold">Product Images & Video</p>
              <p className="text-xs">
                Your product images is the first thing your customer sees on the
                product page.
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm font-semibold">
                Product images <span className="text-rose-500 text-lg">*</span>
              </p>
              <p className="text-xs mb-2">Upload between 3 to 8 images</p>
              <p className="text-xs mb-2">
                (Note: The first picture is used as cover picture of the
                Product.)
              </p>
              <AddImages
                insertImage={insertImage}
                insertImageUrl={insertImageUrl}
                changeImage={changeImage}
                images={images}
                imageShow={imageShow}
                changeImageUrl={changeImageUrl}
              />
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default Update;
