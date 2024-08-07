import { getTotalCartProduct } from "@/api/Cart";
import { getCustomers } from "@/api/Product";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import CustomersTable from "@/components/Customers";
import DashboardChart from "@/components/DashboardChart";
import { Card } from "@/components/ui/card";
import { useProduct } from "@/contexts/ProductContext";
import { User } from "@/Types/Auth";
import { CombinedData } from "@/Types/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { fetchDashboardProducts, dashboardProducts, getCombinedDataForChart } =
    useProduct();
  const [combinedData, setCombinedData] = useState<CombinedData[] | undefined>(
    []
  );
  const [totalSales, setTotalSales] = useState<number>(0);
  const[totalCart,setTotalCart] = useState<number>(0);
  const [Customers,setCustomers] = useState<User[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchProducts = async () => {
      await fetchDashboardProducts(user._id);
      const totalCartProduct = await getTotalCartProduct();
      setTotalCart(totalCartProduct.data.data);
      // console.log('The total cart product is: ',totalCartProduct);
      const dataCombined = await getCombinedDataForChart();
      // console.log("Data combined data here", dataCombined);
      setCombinedData(dataCombined);

      const fetchedCustomers = await getCustomers();
      setCustomers(fetchedCustomers.data.data);
      console.log('This is your Customers',fetchedCustomers); 

      //total sales
      if (dataCombined) {
        const totalSales = dataCombined.reduce(
          (sum, monthDate) => sum + monthDate.totalSold,
          0
        );
        console.log('Total sales is: ',totalSales);
        setTotalSales(totalSales);
      }
    };
    fetchProducts();
  }, [user]);
  return (
    <div className="p-4 w-full">
      <h1 className="text-xl font-bold capitalize">Hello {user?.username}!</h1>
      <div className="grid grid-cols-12 w-full gap-4 mt-4">
        <Card className="p-3 col-span-4">
          <p className="text-semibold">My product</p>
          <p className="text-semibold text-6xl">
            {dashboardProducts?.totalProduct}
          </p>
          <p className="text-semibold">
            <Link to="/sellerDashboard/myProduct">View all products</Link>
          </p>
        </Card>
        <Card className="p-3 col-span-4">
          <p className="text-semibold">Total sold product</p>
          <p className="text-semibold text-6xl">{totalSales}</p>
          <p className="text-semibold">
            <Link to={"/sellerDashboard/myProduct"}>View all products</Link>
          </p>
        </Card>
        <Card className="p-3 col-span-4">
          <p className="text-semibold">Total product in cart</p>
          <p className="text-semibold text-6xl">{totalCart}</p>
          <p className="text-semibold">View all products</p>
        </Card>
      </div>
      <div className="mt-5 grid grid-cols-12 gap-2">
        <DashboardChart combinedData={combinedData} />
        <CustomersTable Customers={Customers} />
      </div>
    </div>
  );
};

export default Dashboard;
