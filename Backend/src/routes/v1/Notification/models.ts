import mongoose, { Types } from "mongoose";

export interface NotificationInterface{
    senderId:Types.ObjectId,
    receiverId:Types.ObjectId,
    message:string,
    productId:Types.ObjectId,
}

const notificationSchema = new mongoose.Schema<NotificationInterface>({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:false,
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:false,
        required:true
    },
    message:{
        type:String,
        unique:false,
        required:true,
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        unique:false,
        required:false,
    }

},{
    timestamps:true
});
export const NotificationModel = mongoose.model<NotificationInterface>("Notification",notificationSchema);
