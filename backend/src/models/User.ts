import mongoose, { Document, Schema } from "mongoose";

//Informacion de typescript
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

//Codigo de Schema en mongo
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    balance: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

//<User> es un generic
const User = mongoose.model<IUser>("User", userSchema);

export default User;
