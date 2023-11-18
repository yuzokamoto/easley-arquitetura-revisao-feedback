import express from 'express'
import { VideoController } from '../controller/VideoController'
import { VideoBusiness } from '../business/VideoBusiness'
import { VideoDatabase } from '../database/VideoDatabase'

export const videoRouter = express.Router()

const videoController = new VideoController(
  new VideoBusiness(
    new VideoDatabase()
  )
)

videoRouter.get("/", videoController.getVideos)
videoRouter.put("/:id/like", videoController.likeOrDislike)
