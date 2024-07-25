import { useAuth } from "@/components/Auth/ProtectedRoutes";
import DashboardChart from "@/components/DashboardChart";
import { Card } from "@/components/ui/card";
import { useProduct } from "@/contexts/ProductContext";
import { useEffect } from "react";

const Dashboard = () => {
    const {user} = useAuth();
    const {dashboardProducts} = useProduct();
    const {fetchDashboardProducts} = useProduct();
    useEffect(()=>{
      const fetchProducts = async() =>{
        if(!user) return;
        await fetchDashboardProducts(user._id);
      }
      fetchProducts();
    },[]);
  return (
    <div className="p-4 w-full">
      <h1 className="text-xl font-bold capitalize">Hello {user?.username}!</h1>
      <div className="grid grid-cols-12 w-full gap-4 mt-4">
        <Card className="p-3 col-span-4">
          <p className="text-semibold">My product</p>
          <p className="text-semibold text-6xl">{dashboardProducts?.totalProduct}</p>
          <p className="text-semibold">View all products</p>
        </Card>
        <Card className="p-3 col-span-4">
          <p className="text-semibold">My product</p>
          <p className="text-semibold text-6xl">12</p>
          <p className="text-semibold">View all products</p>
        </Card>
        <Card className="p-3 col-span-4">
          <p className="text-semibold">My product</p>
          <p className="text-semibold text-6xl">12</p>
          <p className="text-semibold">View all products</p>
        </Card>
      </div>
      <DashboardChart/>
    </div>
  );
}

export default Dashboard
