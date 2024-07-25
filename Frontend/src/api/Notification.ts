import { MarketUrl } from "@/config/Axios";
import { NotificationInterface } from "@/Types/Message";
import "../config/AxiosInterceptor";


export const createNotification= ({
  receiverId,
  senderId,
  message,
  productId
}: NotificationInterface) => {
  return MarketUrl.post("/notification", { receiverId, senderId, message,productId });
};

export const getNotifications = (
  receiverId:string
)=>{
  return MarketUrl.get(`/notification/${receiverId}`);
}