import * as mediaController from "../controllers/mediaController"
import express from "express";
import upload from "../middleware/multerStorage"

const router = express.Router();

router.get("/:id", mediaController.getMedia);

export default router;