import Action from "@/components/Action";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useProduct } from "@/contexts/ProductContext";
import { useEffect, useState } from "react";
import { FetchProduct } from "./ProductDetails";
import { deleteProduct } from "@/api/Product";
import { toast } from "sonner";

const MyProduct = () => {
  const { dashboardProducts, fetchDashboardProducts,deleteProductState } = useProduct();
  const { user } = useAuth();
  const [isActionOpen, setActionOpen] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<FetchProduct[]>([]);
  const handleActionOpen = (index: number) => setActionOpen(index);
  const handleActionClose = () => {setActionOpen(null);}
  


  useEffect(() => {
    if (!user) return;
    fetchDashboardProducts(user._id);
  }, [user]);

  const handleNextPage = () => {
    if (!dashboardProducts) return;
    if (!user) return;
    if (dashboardProducts?.page < dashboardProducts?.totalPage) {
      fetchDashboardProducts(user._id, dashboardProducts?.page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (!dashboardProducts) return;
    if (!user) return;
    if (dashboardProducts?.page > 1) {
      fetchDashboardProducts(user._id, dashboardProducts?.page - 1);
    }
  };

  const toggleSelect = (item: FetchProduct) => {
    setSelectedRows((prev) => {
      const isSelected = prev.some((row) => row._id === item._id);
      if (isSelected) {
        return prev.filter((row) => row._id !== item._id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleDeleteRow = async (item: FetchProduct) => {
    try {
      if (item && item._id) {
        await deleteProduct(item._id);
        deleteProductState(item._id);
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(item);
  };
  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  return (
    <div className="w-full p-4 overflow-x-hidden">
      <Card>
        <CardTitle className="bg-gray-50 px-2 py-3 border-b text-md font-semibold">
          My Products
        </CardTitle>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        <Checkbox />
                      </th>
                      <th scope="col" className="px-6 py-4">
                        SN
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Brand
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Created At
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardProducts &&
                    dashboardProducts.product.length <= 0 ? (
                      <tr>
                        <td colSpan={10} className="text-center py-5 font-semibold text-lg">You haven't added any products yet</td>
                      </tr>
                    ) : (
                      dashboardProducts?.product.map((item, i) => (
                        <tr
                          key={i}
                          className="border-b hover:bg-neutral-100 transition duration-300 ease-in-out dark:border-neutral-500 dark:bg-neutral-700"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <Checkbox
                              key={i}
                              onClick={() => toggleSelect(item)}
                              checked={selectedRows.some(
                                (row) => row._id === item._id
                              )}
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {(dashboardProducts.page - 1) * 10 + i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 font-medium py-4 capitalize">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap font-medium  px-6 py-4">
                            {item.category}
                          </td>
                          <td className="whitespace-nowrap font-medium  px-6 py-4">
                            {item.brand}
                          </td>
                          <td className="whitespace-nowrap font-medium  px-6 py-4">
                            {item.price}
                          </td>
                          <td className="whitespace-nowrap font-medium  px-6 py-4">
                            {item.quantity}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium ">
                            status
                          </td>
                          <td className="whitespace-nowrap font-medium  px-6 py-4">
                            createdAt
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium ">
                              <Action
                                isOpen={isActionOpen === i}
                                onOpen={()=>handleActionOpen(i)}
                                onClose={handleActionClose}
                                product={item}
                                handleDeleteRow={handleDeleteRow}
                              />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-end px-2 py-3">
            <div>
              {dashboardProducts?.page && (
                <div className="text-sm font-semibold text-slate-500">
                  <span>{dashboardProducts.page}</span>
                  <span> out of </span>
                  <span>{dashboardProducts.totalPage}</span>
                </div>
              )}
            </div>
            <div>
              <Button
                onClick={handlePreviousPage}
                disabled={
                  dashboardProducts?.page !== undefined &&
                  dashboardProducts.page <= 1
                }
              >
                Previous
              </Button>
              <Button
                onClick={handleNextPage}
                className="ml-2"
                disabled={
                  dashboardProducts?.page !== undefined &&
                  dashboardProducts.page >= dashboardProducts.totalPage
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyProduct;
