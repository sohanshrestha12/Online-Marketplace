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

export interface FetchNotificationInterface{
  message:string,
  receiverId:string,
  senderId:User,
  productId:string
  createdAt?:string,
}

export interface NotificationInterface{
  senderId:string,
  receiverId:string,
  message:string,
  productId?:string,
}