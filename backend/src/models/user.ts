import { InferSchemaType, Schema, model } from "mongoose";
import Post from "./post";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, default: "" },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  { timestamps: true },
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
