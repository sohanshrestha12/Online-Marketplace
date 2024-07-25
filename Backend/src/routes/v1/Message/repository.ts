import { MessageInterface, MessageModel } from "./models";

export const createMessage = (
  body: MessageInterface
): Promise<MessageInterface> => {
  const newMessage = new MessageModel(body);
  return newMessage.save();
};

export const getPrivateMessages =(roomId:string):Promise<MessageInterface[] | null> =>{
  return MessageModel.find({roomId}).populate({path:'senderId',select:'-password'});
}
