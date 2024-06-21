import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className=" flex justify-center items-center">
      <Card className="w-[450px] px-5 py-3">
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold">GrandBazaar</h2>
            <h3 className="text-sm">Welcome to GrandBazaar! Please login.</h3>
          </div>
          <div>
            <Label className="text-sm mt-4">Email</Label>
            <Input name="email" />
          </div>
          <div>
            <Label className="text-sm mt-2">Password</Label>
            <Input name="email" />
          </div>
          <div className="mt-4">
            <Button className="w-full">Log in</Button>
          </div>
          <div className="h-[1px] bg-black opacity-25 my-3"></div>
          <Button variant={"secondary"} className="w-full flex gap-3">
            <FcGoogle className="text-lg" />
            Log in with Google
          </Button>

          <div className="flex flex-col gap-2 mt-5 items-center text-sm">
            <p>Don't have an account?<Link to={'/signUp'} className="text-blue-500"> Sign Up</Link></p>
            <p className="text-blue-500">Forgot your password?</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
