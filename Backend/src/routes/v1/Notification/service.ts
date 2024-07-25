import { NotificationInterface } from "./models";
import { createNotification, getNotifications } from "./repository";

const NotificationService = {
    async createNotification(body:NotificationInterface) {
        return createNotification(body);
    },
    async getNotifications(receiverId:string){
        return getNotifications(receiverId);
    }
}
export default NotificationService;