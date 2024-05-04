import { RequestHandler } from "express";
import PostModel from "../models/post";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import env from "../utils/validateENV";
import { unlink } from "node:fs";

const secretKey = env.JWT_SECRET;

interface CreatePostBody {
  caption?: string;
  files: File;
  token: string;
  type: string;
}

interface GetPostsQuery {
  page: number

}

interface UpdatePostParams {
  postid: String;
}

interface UpdatePostBody {
  userId: string;
  caption?: string;
  token: string;
}

export const createPost: RequestHandler<
  unknown,
  unknown,
  CreatePostBody,
  unknown
> = async (req, res, next) => {
  try {
    if (!req.body.caption) {
      throw createHttpError(400, "Posts must have a caption!");
    }
    if (!req.file?.filename) {
      throw createHttpError(400, "Posts must have a image!");
    }

    const payload = jwt.verify(req.body.token, secretKey);
    if (payload instanceof Object) {
      const newPost = PostModel.create({
        caption: req.body.caption,
        filepath: req.file?.filename,
        owner: payload._id,
        username: payload.name,
        mediatype: req.body.type,
      });
      res.status(201).json(newPost);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getPosts: RequestHandler<unknown, unknown, unknown, GetPostsQuery> = async (req, res, next) => {
  try {
    let page = req.query.page || 0
    let postsPerPage = 2
    const posts = (await PostModel.find()
    .sort({createdAt:-1})
    .skip(postsPerPage*page)
    .limit(postsPerPage)
    .exec())
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    if (!mongoose.isValidObjectId(postId)) {
      // Validates is type of mongo ID
      throw createHttpError(400, "Invalid Post ID");
    }

    const post = await PostModel.findById(postId).exec();

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const likePost: RequestHandler<
  UpdatePostParams,
  unknown,
  UpdatePostBody,
  unknown
> = async (req, res, next) => {
  const postId = req.params.postid;
  const token = req.body.token;

  try {
    const payload = jwt.verify(req.body.token, secretKey);
    if (payload instanceof Object) {
      const userId = payload._id;

      if (!mongoose.isValidObjectId(postId)) {
        throw createHttpError(400, "Invalid Post ID");
      }

      if (!userId) {
        throw createHttpError(400, "Like must have a User");
      }

      let post = await PostModel.findById(postId).exec();

      if (!post) {
        throw createHttpError(404, "Post not found");
      }

      let user = await UserModel.findById(userId);
      if (user) {
        if (post.users.includes(user._id)) {
          post.users[post.users.indexOf(user._id)] =
            new mongoose.Types.ObjectId("000000000000000000000000"); // TODO : Change this ugly imp
          post.likes = post.likes - 1;
        } else {
          post.users.push(user._id);
          post.likes = post.likes + 1;
        }
        const updatedPost = await post.save();
        res.status(200).json(post.likes);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  // Deletes file
  const postId = req.params.postid;

  try {
    if (!mongoose.isValidObjectId(postId)) {
      throw createHttpError(400, "Invalid Post ID");
    }

    const post = await PostModel.findById(postId).exec();
    await PostModel.findByIdAndDelete(postId).exec();

    if (post?.filepath) {
      await unlink(process.cwd() + "/src/media" + post?.filepath, () => {
        console.log("deleted");
      });
    }
    res.sendStatus(204);
  } catch (error) {}
};
