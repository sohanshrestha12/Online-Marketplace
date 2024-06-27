import mongoose from "mongoose";

export interface Brand {
  name: string;
  category:string;
}

const brandSchema = new mongoose.Schema<Brand>(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    category:{
        type: String,
        required: true,
        unique:false,
    }
  },
  {
    timestamps: true,
  }
);

export const BrandModel = mongoose.model<Brand>("brand", brandSchema);
