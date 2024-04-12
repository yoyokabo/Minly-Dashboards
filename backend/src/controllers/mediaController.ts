import { RequestHandler } from "express";
import PostModel from "../models/post";

export const getMedia: RequestHandler = async (req,res,next) => {
  const id = req.params.id

  const post = await PostModel.findById(id)
  if (post){
    const filepath = post.filepath
    res.sendFile(process.cwd()+"/src/media/"+filepath)
  }

}