import { connectSocket, getSocket } from "@/utils/Socket";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface CommentProps {
  productId: string;
}

const Comment = ({ productId }: CommentProps) => {
  const [comments, setComments] = useState<
    { user: string; comment: string; productId: string; profile: string }[]
  >([]);
  const [commentValue, setCommentValue] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  useEffect(() => {
    console.log(comments);
  }, [comments]);
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) connectSocket(accessToken);
    const socket = getSocket();
    if (socket) {
      socket.emit("joinProduct", productId);
      socket.on("newComment", (commentData) => {
        setComments((prevComment) => [...prevComment, commentData]);
      });
      return () => {
        socket.off("newComment");
        socket.disconnect();
      };
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const socket = getSocket();
    if (socket) {
      socket.emit("newComment", { comment: commentValue, productId });
      setCommentValue("");
    }
  };
  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setCommentValue((prevValue) => prevValue + emojiObject.emoji);
    setShowEmojiPicker(false);
  };
  return (
    <Card className="p-3 min-h-[500px] w-full overflow-hidden">
      <p>This is a comment section</p>
      <form className="relative " onSubmit={handleSubmit}>
        <div className="flex-1 relative">
          <Input
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            name="comment"
            className="!pr-[75px]"
            placeholder="Any thoughts about the product?"
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="absolute hover:cursor-pointer right-11 top-1/2 transform -translate-y-1/2"
          >
            😊
          </button>

          <button
            className="absolute hover:cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
            type="submit"
          >
            <IoSend className="text-xl" />
          </button>
        </div>
        {showEmojiPicker && (
          <EmojiPicker
            className="!absolute right-10 top-10 z-10"
            onEmojiClick={handleEmojiClick}
          />
        )}
      </form>
      <div>
        <p className="text-sm mt-2">Previous Comments</p>
        <div className="flex flex-col gap-3 overflow-hidden mt-3">
          {comments.map((item, i) => (
            <>
              <div className="h-[70px] flex border-b-[1px] mt-2" key={i}>
                <div className="flex gap-2">
                  <div className="rounded-full flex-shrink-0 h-[30px] w-[30px] ">
                    <img
                      className="h-full w-full object-cover rounded-full"
                      src={`http://localhost:5100/${item.profile}`}
                      alt="404 profile Image"
                    />
                  </div>
                  <div>
                    <p className="capitalize text-sm font-semibold">
                      {item.user}
                    </p>
                    <p className="break-all break-words ml-2 px-2  line-clamp-2">
                      {item.comment}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Comment;
