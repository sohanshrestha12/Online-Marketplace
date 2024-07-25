import { NotificationInterface, NotificationModel } from "./models";

export const createNotification = (
  body: NotificationInterface
): Promise<NotificationInterface> => {
  const newNotification = new NotificationModel(body);
  return newNotification.save();
};

export const getNotifications = (receiverId:string) :Promise<NotificationInterface[] | null> =>{
  return NotificationModel.find({receiverId}).populate({path:'senderId',select:'-password'});
}
