import {
    Card
} from "@/components/ui/card";
import { FetchProduct } from "@/pages/ProductDetails";
import "react-quill/dist/quill.snow.css";



interface ProductDescriptionProps {
  activeProduct:FetchProduct;
}

const ProductDescription = ({activeProduct}:ProductDescriptionProps) => {
  return (
    <Card className="px-3 py-3">
      <h3 className="text-sm font-semibold">
        Product details of {activeProduct.size[0]}CM {activeProduct.name}
      </h3>
      <hr className="my-2" />
      <p>Item Description:</p>
      <div className="ql-editor"
        dangerouslySetInnerHTML={{ __html: activeProduct.description }}
      ></div>
    </Card>
  );
};

export default ProductDescription;
