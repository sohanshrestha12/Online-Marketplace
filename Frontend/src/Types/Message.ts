import { User } from "./Auth";

export interface MessageInterface {
  roomId: string;
  senderId: string;
  message: string;
}

export interface FetchPrivateInterface{
  message:string,
  roomId:string,
  senderId:User
}