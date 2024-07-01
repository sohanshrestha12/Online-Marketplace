import { useAuth } from "@/components/Auth/ProtectedRoutes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Profile = () => {
  const auth = useAuth();
  return (
    <Card className="px-3 py-3">
      <h3 className="text-2xl font-semibold">My Profile</h3>
      <h4 className="text-md mt-2 font-semibold">Account Information</h4>
      <hr className="my-2" />
      <div className="grid grid-cols-12 gap-2 mt-4">
        <div className="col-span-4">
          <p className="text-xs">Full Name</p>
          <p className="capitalize">{auth.user?.username}</p>
        </div>
        <div className="col-span-4">
          <p className="text-xs">Email Address</p>
          <p className="capitalize">{auth.user?.email}</p>
        </div>
        <div className="col-span-4">
          <p className="text-xs">User Status</p>
          <p className="capitalize">
            {auth.user?.role === "User" ? "Buyer" : "Seller"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2 mt-5">
        <div className="col-span-4">
          <p className="text-xs">Birthday</p>
          <p className="capitalize">Please add your birthday</p>
        </div>
        <div className="col-span-4">
          <p className="text-xs">Gender</p>
          <p className="capitalize">Please Enter your birthday</p>
        </div>
      </div>
      <div className="mt-[100px] grid gap-2 grid-cols-12 mb-3">
        <Button className="col-span-4">Edit Profile</Button>
        <Button className="col-span-4">Change Password</Button>
      </div>
    </Card>
  );
};

export default Profile;
