import { createContext, ReactNode, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 
import { logout } from "@/api/Auth";
import { useAuth } from "./Auth/ProtectedRoutes";
import { toast } from "sonner";

interface SideBarProps {
  children: ReactNode;
}
interface SidebarContextType {
  expanded: boolean;
}
export const SidebarContext = createContext<SidebarContextType>({
  expanded: true,
});

const SideBar = ({ children }: SideBarProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const auth = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      auth.logout();
      toast.success("Logged out Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside
      className={`h-screen sticky top-0 left-0 ${expanded ? "w-64" : "w-fit"} `}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-3 flex justify-between items-center">
          <span
            className={`overflow-hidden transition-all text-xl pl-2 font-bold ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            <Link to={"/"} className="hover:cursor-pointer">
              {" "}
              GrandBazar{" "}
            </Link>
            <p className="text-sm font-semibold">Seller Center</p>
          </span>
          <button
            onClick={() => {
              setExpanded((curr) => !curr);
            }}
            className="transition duration-300 ease-in-out  p-1.5 rounded-lg text-black bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <TbChevronsLeft /> : <TbChevronsRight />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <img
            src={`http://localhost:5100/${auth.user?.profileImage}`}
            alt="404 avatar"
            className={`w-10 h-10 rounded-full object-cover`}
          />
          <div
            className={`flex justify-between items-center
            overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold capitalize">{auth.user?.username}</h4>
              <span className="text-sm">{auth.user?.email.split('@')[0]}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <HiOutlineDotsVertical className="z-10" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={'/profile'}>
                <DropdownMenuItem>My Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
