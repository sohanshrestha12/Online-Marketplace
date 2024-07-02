import { updateImage } from "@/api/User";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChangeEvent, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

const Profile = () => {
  const auth = useAuth();
  const [imagePreview, setImagePreview] = useState<string>(
    auth.user?.profileImage
      ? `http://localhost:5100/${auth.user.profileImage}`
      : ""
  );
  useEffect(() => {
    setImagePreview(
      auth.user?.profileImage
        ? `http://localhost:5100/${auth.user.profileImage}`
        : ""
    );
  }, [auth.user]);
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profileImage", file);
    const response = await updateImage(formData);
    auth.updateUser(response.data.data);
    console.log(response);
  };

  return (
    <Card className="px-3 py-3">
      <h3 className="text-2xl font-semibold">My Profile</h3>
      <h4 className="text-md mt-2 font-semibold">Account Information</h4>
      <hr className="my-2" />
      <div className="mt-3">
        <form>
          <div className="relative w-fit group">
            <img src={imagePreview} alt="404 Profile" className="rounded-sm object-cover" width="200" />
            <label htmlFor="profileImage">
              <FiEdit className="text-3xl py-1 px-2 text-white bg-indigo-300 rounded-full invisible group-hover:!visible absolute hover:cursor-pointer -top-2 -right-2" />
            </label>
          </div>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            className="hidden"
            onChange={handleImageChange}
          />
        </form>
      </div>
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
            {auth.user?.role === "USER" ? "Buyer" : "Seller"}
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
