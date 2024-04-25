import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import env from "../utils/validateENV";
import jwt from "jsonwebtoken";

const saltRounds = env.SALT_ROUNDS;
const secretKey = env.JWT_SECRET;

interface CreateUserBody {
  username?: string;
  password?: string;
  email?: string;
}

interface AuthUserBody {
  username?: string;
  password?: string;
}

const bcrypt = require("bcrypt");

export const createUser: RequestHandler<
  unknown,
  unknown,
  CreateUserBody,
  unknown
> = async (req, res, next) => {
  try {
    if (!req.body.username) {
      throw createHttpError(400, "SECURITY RISK");
    }
    if (!req.body.password) {
      throw createHttpError(400, "Password Invalid");
    }
    if (await UserModel.findOne({ username: req.body.username })) {
      throw createHttpError(400, "Username already created");
    }
    if (!req.body.email) {
      throw createHttpError(400, "Email Invalid");
    }
    new Promise((resolve, reject) =>
      bcrypt.hash(
        req.body.password,
        saltRounds,
        (err: unknown, hash: unknown) => {
          if (err) {
            throw createHttpError(500, "Encryption error");
            reject(err);
          } else {
            resolve(hash);
          }
        },
      ),
    ).then(async (passwordHash) => {
      const newUser = await UserModel.create({
        username: req.body.username,
        passwordHash: passwordHash,
        email: req.body.email,
      });
      res.status(201).json(newUser);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      createHttpError(500, error.message);
    }
    next(error);
  }
};

export const authUser: RequestHandler<
  unknown,
  unknown,
  AuthUserBody,
  unknown
> = async (req, res, next) => {
  try {
    if (!req.body.password) {
      throw createHttpError(400, "Password Invalid");
    }
    if (!req.body.username) {
      throw createHttpError(400, "Username Invalid");
    }
    let user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      throw createHttpError(400, "Username not found");
    }
    if (await bcrypt.compare(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        { _id: user._id?.toString(), name: user.username },
        secretKey,
        {
          expiresIn: "1h",
        },
      );
      res.status(200).json(token);
    } else {
      throw createHttpError(400, "Wrong Password");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      createHttpError(500, error.message);
    }
    next(error);
  }
};
