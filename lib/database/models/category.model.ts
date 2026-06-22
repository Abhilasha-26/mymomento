import { Document, Schema, model, models,Types } from "mongoose";

export interface ICategory extends Document {
  _id:Types.ObjectId;
  name: string;
}

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Category;