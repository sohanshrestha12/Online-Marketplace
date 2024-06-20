import { Input } from "@/components/ui/input";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { ModeToggle } from "./ThemeToggle";
import Person from "../assets/images/person.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import ToolTip from "./ToolTip";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-col gap-3 max-w-screen-2xl pt-4 pb-3">
      <div className="flex gap-5">
        <div>
          <h1 className="font-bold tracking-wider text-4xl">GrandBazaar</h1>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-[60%] flex items-center relative">
            <Input
              className="w-full padding_Right rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus-visible:border-2 focus:border-black focus-visible:shadow-sm"
              placeholder="Search"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <RiSearchLine className="cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 mr-5">
          <ToolTip name={"Add to cart"}>
            <LuShoppingCart className="text-xl hover:cursor-pointer" />
          </ToolTip>
          <ToolTip name={"Favourites"}>
            <MdOutlineFavoriteBorder className="text-xl hover:cursor-pointer" />
          </ToolTip>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex gap-2 items-center">
                <div className="h-[45px] w-[45px] rounded-full flex">
                  <img
                    src={Person}
                    className="rounded-full w-full h-full object-cover"
                    alt="User"
                  />
                </div>
                <p className="capitalize m-0">hello abc</p>
                <IoIosArrowDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ModeToggle />
      </div>
      <div>
        <ul>
          <li className="flex gap-5 text-sm font-medium">
            <Link className="no-underline text-black" to="/">
              Home
            </Link>
            <Link className="no-underline text-black" to="/">
              Help & Support
            </Link>
            <Link className="no-underline text-black" to="/seller">
              Become a seller
            </Link>
          </li>
        </ul>
      </div>
      <div className="h-[1px] w-full bg-slate-300 opacity-50 mb-3"></div>
    </nav>
  );
};

export default Navbar;
