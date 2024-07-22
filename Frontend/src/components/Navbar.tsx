import { logout } from "@/api/Auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Field, Form, Formik } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "./Auth/ProtectedRoutes";
import { ModeToggle } from "./ThemeToggle";
import ToolTip from "./ToolTip";

const initialValues = {
  search: "",
};

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { user } = useAuth();

  // const [notifications, setNotifications] = useState<
  //   { senderId: string; message: string }[]
  // >([]);
  // useEffect(() => {
  //   if(user?.role === "SELLER"){
  //     const accessToken = Cookies.get("accessToken");
  //     if (accessToken) connectSocket(accessToken);
  //     const socket = getSocket();

  //     if (socket) {
  //       socket.emit('joinSellerRoom',(user._id));
  //       socket.on("messageNotification", (notification) => {
  //         console.log("Received notification", notification);
  //         setNotifications((prev) => [...prev, notification]);
  //         // Show a toast notification or a custom notification
  //         toast.success(`New message from user ${notification.senderId}`);
  //       });
  
  //       return () => {
  //         socket.off("messageNotification");
  //       };
  //     }
  //   }
  // }, [user]);
  // useEffect(()=>{
  //   console.log(notifications);
  // },[notifications])

  const handleSearch = (values: { search: string }) => {
    navigate(`/productLists?category=${values.search}`);
  };

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
    <nav className="flex flex-col gap-3 max-w-screen-2xl pt-3 pb-3">
      <div className="flex gap-5 items-center">
        <div>
          <Link to={"/"}>
            <h1 className="font-bold tracking-wider text-4xl hover:cursor-pointer">
              GrandBazaar
            </h1>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-[100%] flex justify-center items-center relative">
            <Formik initialValues={initialValues} onSubmit={handleSearch}>
              {({ handleSubmit }) => (
                <Form className="w-[80%] flex items-center relative">
                  <Field
                    className="w-full padding_Right rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus-visible:border-2 focus:border-black focus-visible:shadow-sm"
                    placeholder="Search"
                    as={Input}
                    name="search"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <RiSearchLine
                      className="cursor-pointer"
                      onClick={() => handleSubmit()}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="flex gap-4 mr-5">
          <ToolTip name={"Add to cart"}>
            <Link to={"/AddToCart"}>
              <LuShoppingCart className="text-xl hover:cursor-pointer" />
            </Link>
          </ToolTip>
          <ToolTip name={"Favourites"}>
            <Link to={"/profile/favourites"}>
              <MdOutlineFavoriteBorder className="text-xl hover:cursor-pointer" />
            </Link>
          </ToolTip>
        </div>
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex gap-2 items-center">
                  <div className="h-[45px] w-[45px] rounded-full flex">
                    <img
                      src={`http://localhost:5100/${user.profileImage}`}
                      className="rounded-full w-full h-full object-cover"
                      alt="User"
                    />
                  </div>
                  <p className="capitalize m-0">
                    hello <span className="capitalize">{user?.username}</span>
                  </p>
                  <IoIosArrowDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/profile"}>
                  <DropdownMenuItem className="hover:cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                {auth.user?.role === "SELLER" && (
                  <Link to={"sellerDashboard"}>
                    <DropdownMenuItem className="hover:cursor-pointer">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center justify-between">
              <NavLink
                to={"/login"}
                className={"mr-3 rounded px-3 p-2 hover:bg-gray-200"}
              >
                <p className=" rounded hover:cursor-pointer font-semibold ">
                  Log in
                </p>
              </NavLink>
              <div className="h-10 w-[0.7px] bg-gray-600 opacity-55"></div>

              <NavLink
                to={"/signUp"}
                className={"ml-3 rounded px-3 p-2 hover:bg-gray-200"}
              >
                <p className=" font-semibold">Sign up</p>
              </NavLink>
            </div>
          )}
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
            {user?.role === "SELLER" ? (
              <Link className="no-underline text-black" to="/profile">
                Manage Profile
              </Link>
            ) : (
              <Link className="no-underline text-black" to="/seller">
                Become a seller
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="h-[1px] w-full bg-slate-300 opacity-50 mb-3"></div>
    </nav>
  );
};

export default Navbar;
