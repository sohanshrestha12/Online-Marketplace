import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className=" flex justify-center items-center">
      <Card className="w-[450px] px-5 py-3">
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold">GrandBazaar</h2>
            <h3 className="text-sm">Welcome to GrandBazaar! Please SignUp.</h3>
          </div>
          <div>
            <Label className="text-sm mt-4">Full Name</Label>
            <Input name="name" />
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
            <Button className="w-full">Sign Up</Button>
          </div>
       

          <div className="flex flex-col gap-2 mt-5 items-center text-sm">
            <p>
             Already have an account?
              <Link to={"/login"} className="text-blue-500">
                 {" "}Log in
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SignUp
