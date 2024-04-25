import * as PostsController from "../controllers/postsController";
import express from "express";
import upload from "../middleware/multerStorage";

const router = express.Router();

router.get("/", PostsController.getPosts);

router.get("/:postid", PostsController.getPost);

router.post("/", upload.single("file"), PostsController.createPost);

router.put("/:postid/likes", PostsController.likePost);

router.delete("/:postid", PostsController.deletePost);

export default router;
