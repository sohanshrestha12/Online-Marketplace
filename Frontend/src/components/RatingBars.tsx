import { FaStar } from "react-icons/fa";
import { countRatings } from "@/utils/Ratings";
import { FetchProduct } from "@/pages/ProductDetails";
interface RatingsBarProps {
  product: FetchProduct;
}

const RatingBars = ({ product }: RatingsBarProps) => {
  const ratingCounts = product.rating && countRatings(product.rating);
  if (!ratingCounts) return;
  const maxCount = Math.max(...ratingCounts);
  return (
    <div className="w-[350px] border-r-2 pr-10">
      <h2 className="text-xl font-semibold mb-4">Rating Distribution</h2>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star, index) => (
          <div key={star} className="flex items-center">
            <FaStar className="text-yellow-500" />
            <span className="ml-2 w-[60px]">
              {star} star{star > 1 ? "s" : ""}:
            </span>
            <div className="flex-1 ml-2 rounded bg-gray-300 h-4 relative">
              <div
                style={{ width: `${(ratingCounts[index] / maxCount) * 100}%` }}
                className="bg-blue-500 h-full rounded"
              ></div>
            </div>
            <span className="ml-2">{ratingCounts[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBars;
