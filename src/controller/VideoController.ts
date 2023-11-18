import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { Request, Response } from "express"
import { VideoBusiness } from "../business/VideoBusiness"
import { GetVideosSchema } from "../dtos/videos/getVideos.dto"
import { LikeOrDislikeSchema } from "../dtos/videos/likeOrDislike.dto"

export class VideoController {
  constructor(
    private videoBusiness: VideoBusiness
  ) {}

  public getVideos = async (req: Request, res: Response) => {
    try {

      const input = GetVideosSchema.parse({
        // não precisa de nada da requisição, é um GET all
      })

      const output = await this.videoBusiness.getVideos(input)

      res.status(200).send(output)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public likeOrDislike = async (req: Request, res: Response) => {
    try {

      const input = LikeOrDislikeSchema.parse({
        videoId: req.params.id,
        like: req.body.like,
        token: req.headers.authorization
      })

      const output = await this.videoBusiness.likeOrDislike(input)

      res.status(200).send(output)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}