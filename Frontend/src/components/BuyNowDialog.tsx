import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FetchProduct } from "@/pages/ProductDetails";
import RatingStars from "./RatingsStar";
import { useEffect, useState } from "react";
import { useAuth } from "./Auth/ProtectedRoutes";
import { Button } from "./ui/button";

interface BuyNowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  activeProduct: FetchProduct | undefined;
  selectedColor: number;
  selectedSize: number;
  quantity: string;
}

const BuyNowDialog = ({
  isOpen,
  onClose,
  activeProduct,
  selectedColor,
  selectedSize,
  quantity,
}: BuyNowDialogProps) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    if (
      activeProduct &&
      activeProduct.rating &&
      activeProduct.rating.length > 0
    ) {
      const totalRating = activeProduct.rating.reduce(
        (sum, r) => sum + r.rating,
        0
      );
      const avgRating = totalRating / activeProduct.rating.length;
      setAverageRating(avgRating);
    } else {
      setAverageRating(0);
    }
  }, [activeProduct, user]);
  const totalQuantity = parseInt(quantity, 10) || 0;
  const totalPrice = activeProduct ? activeProduct.price * totalQuantity : 0;

  const handleBuyProduct = () => {
    const purchaseData = {
      productId: activeProduct && activeProduct._id,
      userId: user && user._id,
      selectedColor: activeProduct && activeProduct.colorFamily[selectedColor],
      selectedSize: activeProduct && activeProduct.size[selectedSize],
      quantity: totalQuantity,
      totalPrice: totalPrice,
    };
    console.log(purchaseData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[900px]">
        {activeProduct && (
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-6">
              <img
                src={`http://localhost:5100/${activeProduct.images[0]}`}
                alt="404 image not found"
              />
            </div>
            <div className="col-span-6">
              <h4 className="font-semibold text-lg">Product Details</h4>
              <h6 className="mb-1">{activeProduct.name}</h6>
              <p className="text-sm">
                Brand:{" "}
                <span className="text-blue-500">
                  {activeProduct.brand ? activeProduct.brand : "No brand"}{" "}
                </span>
              </p>
              <p className="mb-3 text-sm flex gap-1 items-center">
                Rating: <RatingStars rating={averageRating} />
              </p>
              <p className="mt-2 flex gap-3 items-center">
                Selected Color:
                <div
                  className="!h-[30px] !w-[30px] rounded"
                  style={{
                    backgroundColor: activeProduct.colorFamily[selectedColor],
                  }}
                ></div>
              </p>
              <p className="mt-3">
                Selected Size: {activeProduct.size[selectedSize]}
              </p>
              <p className="mt-3">Selected Quantity:{" " + quantity}</p>
              <p className="mt-3">
                One Quantity Price:{" " + activeProduct.price}
              </p>
              <p className="mt-3 text-lg font-semibold">
                Total Price:{" "}
                <span className="font-semibold text-[#f85606]">
                  {totalPrice}
                </span>
              </p>
              <div className="mt-5 flex gap-2">
                <Button onClick={handleBuyProduct} variant={"orange"} className="flex-1">
                  Buy Product ({quantity})
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BuyNowDialog;
