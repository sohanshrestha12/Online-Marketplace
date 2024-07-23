import { getPurchasedProduct } from "@/api/Product";
import { Button } from "@/components/ui/button";
import { FilterPurchasedProduct } from "@/Types/Product";
import { useEffect, useState } from "react";

const MyOrder = () => {
  const [purchasedProduct, setPurchasedProduct] =
    useState<FilterPurchasedProduct>();

  useEffect(() => {
    const getAllPurchaseProducts = async () => {
      try {
        const response = await getPurchasedProduct();
        setPurchasedProduct(response.data.data);
        console.log("My Purchased products", response);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPurchaseProducts();
  }, []);

  const handlePreviousPage = async()=>{
    if (!purchasedProduct) return;
    if (purchasedProduct.page >1) {
      try {
        const response = await getPurchasedProduct({
          page: purchasedProduct.page - 1,
        });
        setPurchasedProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleNextPage = async () => {
    if (!purchasedProduct) return;
    if (purchasedProduct.page < purchasedProduct.totalPage) {
      try {
        const response = await getPurchasedProduct({
          page: purchasedProduct.page + 1,
        });
        setPurchasedProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-lg font-semibold">My orders</h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto w-full">
          <div className="inline-block min-w-full ">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light overflow-x-scroll ">
                <thead className="border-b text-center bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Sn
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Total Price
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {purchasedProduct?.purchasedProductList.map((item, i) => (
                    <tr key={i}>
                      <td className="text-center py-2 font-semibold text-md">
                        {" "}
                        {++i}
                      </td>
                      <td className="text-center py-2 font-semibold flex justify-center text-md">
                        {" "}
                        <img
                          src={`http://localhost:5100/${item.productId.images[0]}`}
                          className="h-[50px] w-[50px]"
                          alt=""
                        />
                      </td>
                      <td className="text-center py-2 font-semibold text-md">
                        {item.productId.name}
                      </td>
                      <td className="text-center py-2 font-semibold text-md">
                        {item.productId.brand}
                      </td>
                      <td className="text-center py-2 font-semibold text-md">
                        {item.quantity}
                      </td>
                      <td className="text-center py-2 font-semibold text-md">
                        {item.productId.price}
                      </td>
                      <td className="text-center py-2 font-semibold text-md">
                        {item.totalPrice}
                      </td>
                      <td className="text-center text-green-500 py-2 font-semibold text-md">
                        Purchase Completed
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={handlePreviousPage} disabled={purchasedProduct && purchasedProduct.page !== undefined && purchasedProduct.page <=1}>Previous</Button>
        <Button onClick={handleNextPage} disabled={purchasedProduct && purchasedProduct.page !== undefined && purchasedProduct?.page >= purchasedProduct?.totalPage}>Next</Button>
      </div>
    </div>
  );
};

export default MyOrder;
