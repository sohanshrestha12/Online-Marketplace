import mongoose, { Schema, Types } from "mongoose";

export interface RatingModel {
  _id?:string;
  user: Types.ObjectId;
  rating: number;
}

const ratingSchema = new mongoose.Schema<RatingModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const RatingModel = mongoose.model<RatingModel>("Rating", ratingSchema);
