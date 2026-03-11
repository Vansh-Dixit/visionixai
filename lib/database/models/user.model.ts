import { model, models, Schema } from "mongoose";
import { Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  photo?: string;
  creditBalance?: number;
  planId?: number;
  userName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  photo: { type: String },
  creditBalance: { type: Number, default: 10 },
  planId: { type: Number, default: 1 },
  userName: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;