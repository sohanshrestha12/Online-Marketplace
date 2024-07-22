import { useAuth } from "@/components/Auth/ProtectedRoutes";
import Cookies from "js-cookie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

interface SocketProviderProps {
  children: ReactNode;
}
interface ProductContextValue {
  socket: Socket | undefined;
}
const SocketContext = createContext<ProductContextValue>({
  socket: undefined,
});

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const {user} = useAuth();
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      const socketInstance = io("http://localhost:5100", {
        query: { token: accessToken },
        transports: ["websocket"],
      });
      socketInstance.on("connect", () => {
        console.log("Connected to socket server:", socketInstance.id);
      });
      socketInstance.on("disconnect", (reason) => {
        console.log("Disconnected from the socket server:", reason);
        if (reason === "io server disconnect") {
          socketInstance.connect();
        }
      });
      socketInstance.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      setSocket(socketInstance);
    }
    return () => {
      socket?.disconnect();
    };
  }, [user]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSocket = () => useContext(SocketContext);
