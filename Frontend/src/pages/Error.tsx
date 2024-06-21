import { Button } from "@/components/ui/button";
import Robot from "../assets/images/404_robot.png";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="min-h-screen grid grid-cols-12 gap-3 px-5 py-5">
      <div className="col-span-6 flex justify-center flex-col items-center">
        <div>
          <Link to={"/"}>
            <Button variant={"link"} className="p-0">
              <h3 className="font-semibold text-4xl mb-5">GrandBazaar</h3>
            </Button>
          </Link>
          <p>404. There is an error.</p>
          <p className="mb-3">
            The requested URL was not found on the server. Thats all we know.
          </p>
          <Link to={"/"}>
            <Button>Back To the home page.</Button>
          </Link>
        </div>
      </div>
      <div className="col-span-6 flex justify-center">
        <img src={Robot} alt="404 not found" />
      </div>
    </div>
  );
};

export default Error;
