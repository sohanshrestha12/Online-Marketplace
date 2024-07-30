import { Card } from "@/components/ui/card";
import { FetchProduct } from "@/pages/ProductDetails";
import "react-quill/dist/quill.snow.css";

interface ProductDescriptionProps {
  activeProduct: FetchProduct;
}
function extractYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)|(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]+)/;
  const matches = url.match(regex);
  return matches ? matches[1] || matches[2] : null;
}

const ProductDescription = ({ activeProduct }: ProductDescriptionProps) => {
  return (
    <Card className="px-3 py-3">
      <h3 className="text-sm font-semibold">
        Product details of {activeProduct.size[0]}CM {activeProduct.name}
      </h3>
      <hr className="my-2" />
      <p>Item Description:</p>
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: activeProduct.description }}
      ></div>
      {activeProduct.videoUrl && (
        <div>
          <h5 className="text-sm text-gray-700 mb-2 mt-3">Here is the demo video of the real product</h5>
          <iframe
            src={`https://www.youtube.com/embed/${extractYouTubeVideoId(
              activeProduct.videoUrl
            )}`}
            height={315}
            width={500}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Product Video"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </Card>
  );
};

export default ProductDescription;
