import { useAuth } from "@/components/Auth/ProtectedRoutes";
import DashboardChart from "@/components/DashboardChart";
import { Card } from "@/components/ui/card";
import { useProduct } from "@/contexts/ProductContext";
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
  useEffect(() => {
    if (!user) return;
    const fetchProducts = async () => {
      await fetchDashboardProducts(user._id);
      const dataCombined = await getCombinedDataForChart();
      console.log("Data combined data here", dataCombined);
      setCombinedData(dataCombined);

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
          <p className="text-semibold">My product</p>
          <p className="text-semibold text-6xl">12</p>
          <p className="text-semibold">View all products</p>
        </Card>
      </div>
      <div className="w-[700px] h-[700px] mt-5">
        <DashboardChart combinedData={combinedData} />
      </div>
    </div>
  );
};

export default Dashboard;
