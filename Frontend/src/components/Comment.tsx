import { createComment } from "@/api/Product";
import { useSocket } from "@/contexts/SocketContext";
import { FetchProduct, rating } from "@/pages/ProductDetails";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useAuth } from "./Auth/ProtectedRoutes";
import RatingBars from "./RatingBars";
import Ratings from "./Ratings";
import RatingStars from "./RatingsStar";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface CommentProps {
  product: FetchProduct;
  updateRating: (rating: rating) => void;
}

const Comment = ({ product, updateRating }: CommentProps) => {
  const [comments, setComments] = useState<
    {
      userId: string;
      user: string;
      comment: string;
      productId: string;
      profile: string;
    }[]
  >(
    product && product.comments
      ? product.comments.map((comm) => ({
          userId: comm.user._id,
          user: comm.user.username,
          comment: comm.content,
          productId: product._id!,
          profile: comm.user.profileImage,
        }))
      : []
  );
  const { user } = useAuth();
  const [commentValue, setCommentValue] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [averageRating, setAverageRating] = useState<number>(0);
  const {socket}= useSocket();

  useEffect(() => {
    if (socket) {
      console.log('send the comment')
      socket.emit("joinProduct", product._id);
      socket.on(
        "newComment",
        (commentData: {
          userId: string;
          user: string;
          comment: string;
          productId: string;
          profile: string;
        }) => {
          setComments((prevComment) => [commentData, ...prevComment]);
        }
      );
      return ()=>{
        socket.off('newComment');
      }
    }
  }, [product._id,socket]);

  useEffect(()=>{
    console.log('This is comment value',comments);
  },[comments]);
  useEffect(() => {
    if (product.rating && product.rating.length > 0) {
      const totalRating = product.rating.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = totalRating / product.rating.length;
      setAverageRating(avgRating);
    } else {
      setAverageRating(0);
    }
  }, [product.rating, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!user) return;
      const response = await createComment(product._id!, {
        user: user._id!,
        content: commentValue,
      });
      console.log("Comment", response);
      if (socket) {
        socket.emit("newComment", {
          comment: commentValue.trim(),
          productId: product._id,
        });
        setCommentValue("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setCommentValue((prevValue) => prevValue + emojiObject.emoji);
    setShowEmojiPicker(false);
  };
  return (
    <Card className="p-3 min-h-[400px] w-full mb-5">
      <div>
        <h6 className="font-semibold border-b-[1px] -mx-4 mb-2 -my-4 p-3 bg-gray-100">
          Ratings and Reviews
        </h6>
        <div className="flex py-3 h-fit gap-3 border-b-[1px] mb-3">
          <div>
            <h6 className="mb-2">All ratings</h6>
            <p className="text-2xl font-semibold">
              {averageRating ? averageRating.toFixed(1) : "No ratings yet"}
            </p>
          </div>
          <RatingBars product={product} />
          <Ratings product={product} updateRating={updateRating} />
        </div>
      </div>
      <p>
        Tell us about your experience or queries.
        {!user && <span> (LogIn First to add review)</span>}
      </p>
      <form className="relative mt-2" onSubmit={handleSubmit}>
        <div className="flex-1 relative">
          <Input
            disabled={!user}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            name="comment"
            className="!pr-[75px]"
            placeholder="Any thoughts about the product?"
          />
          <button
            disabled={!user}
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="absolute hover:cursor-pointer right-11 top-1/2 transform -translate-y-1/2"
          >
            😊
          </button>

          <button
            disabled={!user}
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
          {comments.length > 0 ? (
            comments.map((item, i) => (
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
                      {product.rating?.some((r) => r.user === item.userId)?<RatingStars rating={product.rating.find(r=>r.user === item.userId)?.rating ?? 0} />:0}
                    </p>
                    <p className="break-all break-words ml-2 px-2  line-clamp-2">
                      {item.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p>No Comments yet</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Comment;
