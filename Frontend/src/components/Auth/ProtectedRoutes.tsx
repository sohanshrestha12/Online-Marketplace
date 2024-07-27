
import { AuthContextType, User } from "@/Types/Auth";
import { getCurrentUser } from "@/api/Auth";
import Cookies from "js-cookie";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<User>();
  const [roomId, setRoomId] = useState<string>("");


  // useEffect(()=>{
  //   console.log("User is :", user);
  // },[user])
  const login = (user:User) =>{
    setUser(user);
  }
  const updateUser = (user:User) =>{
    setUser(user);
  } 
  const updateActiveUser = (user:User)=>{
    setActiveUser(user);
  }
  const updateRoomId = (roomId:string)=>{
    setRoomId(roomId);
  } 

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        console.log(accessToken)
        if (accessToken) {
          const response = await getCurrentUser();
          console.log(response);
          setUser(response.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    };
    fetchUser();
  }, []);

   if (loading) {
     return null; // keep loader here
   }
  return (
    <AuthContext.Provider value={{ user, logout,login,updateUser ,activeUser,updateActiveUser,updateRoomId,roomId}}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
