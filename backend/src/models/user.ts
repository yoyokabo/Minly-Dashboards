import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema( // TODO : Add Validation
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
