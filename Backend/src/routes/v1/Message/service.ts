import { MessageInterface } from "./models";
import { createMessage, getPrivateMessages } from "./repository";

const MessageService = {
    async createMessage (body:MessageInterface)  {
        return createMessage(body);
    },
    async getPrivateMessages(roomId:string){
        return getPrivateMessages(roomId);
    }
}
export default MessageService;
