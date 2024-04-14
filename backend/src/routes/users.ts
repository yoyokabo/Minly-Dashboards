import * as usersController from "../controllers/usersController";
import express from "express";

const router = express.Router();

router.post("/register", usersController.createUser);

router.post("/login", usersController.authUser);

export default router;
