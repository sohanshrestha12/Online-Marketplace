import mongoose, { Types } from "mongoose";

export interface MessageInterface{
    roomId:string;
    senderId:Types.ObjectId;
    message:string,
}

const MessageSchema = new mongoose.Schema<MessageInterface>({
    roomId:{
        type:String,
        required:true,
        unique:false,
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:false,
    },
    message:{
        type:String,
        required:true,
        unique:false,
    },
    
});

export const MessageModel = mongoose.model<MessageInterface>("Message",MessageSchema);