import { MarketUrl } from "@/config/Axios";
import "../config/AxiosInterceptor";
import { MessageInterface } from "@/Types/Message";


export const createMessage = ({roomId,senderId,message}:MessageInterface) => {
  return MarketUrl.post("/message",{roomId,senderId,message});
};

export const fetchPrivateMessages = (roomId:string) =>{
  return MarketUrl.get(`/message/${roomId}`);
}