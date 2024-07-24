import { IoClose, IoSend } from "react-icons/io5";
import ToolTip from "./ToolTip";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Input } from "./ui/input";
import { FetchProduct } from "@/pages/ProductDetails";
import { User } from "@/Types/Auth";
import { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

interface PersonalChatProps {
  activeProduct?: FetchProduct;
  activeUser?: User;
  toggleChat: () => void;
  handleMessageSubmit: (
    values: FormikValues,
    helpers: FormikHelpers<FormikValues>,
    socket: Socket,
    user: User,
    roomId: string
  ) => void;
  socket: Socket;
  user: User;
  roomId: string;
}

const PersonalChat = ({
  activeProduct,
  activeUser,
  toggleChat,
  handleMessageSubmit,
  socket,
  user,
  roomId,
}: PersonalChatProps) => {
  const initialValue: FormikValues = {
    message: "",
  };
  const [privateMessage, setPrivateMessage] = useState<{message:string,senderDetails:User}[]>([]);
  const endofMessageRef = useRef<HTMLDivElement>(null);

  const profileImage = activeProduct?.createdBy?.profileImage || activeUser?.profileImage;
  const username = activeProduct?.createdBy?.username || activeUser?.username;

  useEffect(() => {
    console.log("private Message", privateMessage);
    endofMessageRef.current?.scrollIntoView({behavior:"smooth"});
  }, [privateMessage]);

  useEffect(() => {
    if(socket){
        socket.on("receivedMessage", (message) => {
          console.log("listening on the new message", message);
          setPrivateMessage((prevMessages) => [...prevMessages, message]);
        });
        return () =>{
            console.log("Cleanup socket event listener");
            socket.off("receivedMessage");
        }
    }
     return () => {
       console.log("Cleanup function called");
     };
  }, [socket]);

  return (
    <div className="h-[450px] w-[380px] rounded-t-md flex flex-col fixed bottom-0 right-10 shadow z-10 bg-white">
      <div className="p-3 flex gap-2 items-center  justify-between bg-blue-600 rounded">
        <div className="flex gap-3 items-center">
          <img
            src={`http://localhost:5100/${profileImage}`}
            className="rounded-full object-contain h-[40px] w-[40px]"
            alt="404 profile not found"
          />
          <h5 className="text-lg font-semibold capitalize text-white">
            {username}
          </h5>
        </div>
        <div className="p-2 hover:cursor-pointer group" onClick={toggleChat}>
          <IoClose className="text-white text-xl -mt-6 -mr-3 transition-all group-hover:!text-gray-200" />
        </div>
      </div>
      <div className="flex-1 h-full overflow-hidden px-3 overflow-y-scroll flex flex-col gap-3 py-3">
        {privateMessage.map((item, i) => (
          <div
            key={i}
            className={`flex gap-3 rounded-full items-center ${
              item.senderDetails._id === user._id
                ? ""
                : "flex-row-reverse justify-start"
            } `}
          >
            <img
              className="h-[40px] w-[40px] rounded-full object-contain"
              src={`http://localhost:5100/${item.senderDetails.profileImage}`}
              alt="404 not found"
            />
            <p className="px-2 py-2 bg-blue-500 rounded-xl break-words break-all text-white">{item.message}</p>
          </div>
        ))}
        <div ref={endofMessageRef}/>
      </div>
      <div className="h-fit mb-2 mt-2 flex items-center bg-gray-100 text-black">
        <Formik
          initialValues={initialValue}
          onSubmit={(values, helpers) =>
            handleMessageSubmit(values, helpers, socket, user, roomId)
          }
        >
          <Form className="relative w-full">
            <Field
              className="focus-visible:outline-none pr-10 focus-visible:ring-offset-transparent focus-visible:ring-none focus:border-none focus-visible:ring-offset-0 focus-visible:box-shadow-none focus-visible:border-none "
              placeholder="Enter your message"
              name="message"
              as={Input}
            />
            <div className="absolute flex items-center top-[50%] transform -translate-y-[50%] right-3">
              <button type="submit" className="p-0 m-0 flex items-center">
                <ToolTip name="Send">
                  <IoSend className="text-lg" />
                </ToolTip>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PersonalChat;
