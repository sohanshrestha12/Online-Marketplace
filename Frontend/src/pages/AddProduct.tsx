import BasicInfo from "@/components/BasicInfo";
import { Card } from "@/components/ui/card";

const AddProduct = () => {

  return (
    <div className="w-full gap-2 flex p-4 ">
      <div className=" w-[80%]">
        <BasicInfo />
      </div>
      <div  className="w-[20%]">
        <Card>
          <div>
            <div className="px-3 py-2 text-sm bg-indigo-200 border-b">
              <p>Tips | Product Attributes</p>
            </div>
            <div className="bg-indigo-50">
              <p className="px-3 py-2 text-sm ">
                Accurately fill in all relevant attributes to make your products
                easier to find, improving coversion rate, customer experience &
                sales. Give customers useful Information & the details they need
                about your products so that they make confident purchase
                designs.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
