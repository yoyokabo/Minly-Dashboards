import * as PostsController from "../controllers/postsController";
import express from "express";
import upload from "../middleware/multerStorage";

const router = express.Router();

router.get("/", PostsController.getPosts);

router.get("/:postId", PostsController.getPost);

router.post("/", upload.single("file"), PostsController.createPost);

router.patch("/:postId", PostsController.likePost);

router.delete("/:postId", PostsController.deletePost);

export default router;
