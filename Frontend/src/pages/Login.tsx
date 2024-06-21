import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

const Login = () => {
  return (
    <div className=" flex justify-center items-center">
      <Card className="w-[50vw]">
        <div className="flex flex-col h-full">
            <h2>GrandBazaar</h2>
            <h3>Welcome to GrandBazaar! Please login.</h3>
            <div>
                <Label>Email</Label>
                <Input name="email"/>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
