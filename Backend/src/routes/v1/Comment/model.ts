import mongoose, { Document } from "mongoose";

export interface Comment {
  content: string;
  user: string;
}

export interface CommentDocument extends Document, Comment {
    _id:string,
}

const commentSchema = new mongoose.Schema<CommentDocument>(
  {
    content: {
      type: String,
      required: [true, "Content is Required"],
      unique: false,
    },
    user: {
      type: String,
      ref:"User",
      required: [true, "User is Required"],
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = mongoose.model<CommentDocument>(
  "Comment",
  commentSchema
);
