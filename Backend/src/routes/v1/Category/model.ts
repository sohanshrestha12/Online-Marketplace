import mongoose, { InferSchemaType } from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        parent:{
            type: String,
            ref:'Category',
            required:false,
            unique:false
        },
        level:{
            type:Number,
            required:true,
        }
    }
);

type category = InferSchemaType<typeof categorySchema>;
export const CategoryModel = mongoose.model<category>("Category",categorySchema);