import { InferSchemaType, Schema, model } from "mongoose";

const postSchema = new Schema( // TODO :Add Validation
  {
    caption: { type: String, required: true },
    filepath: { type: String },
    mediatype: { type: String },
    likes: { type: Number, default: 0 },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    username: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

type Post = InferSchemaType<typeof postSchema>;

export default model<Post>("Post", postSchema);
