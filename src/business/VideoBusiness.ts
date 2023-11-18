import { VideoDatabase } from "../database/VideoDatabase";
import { GetVideosInputDTO, GetVideosOutputDTO } from "../dtos/videos/getVideos.dto";
import { LikeOrDislikeInputDTO, LikeOrDislikeOutputDTO } from "../dtos/videos/likeOrDislike.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Video, VideoModel } from "../models/Video";

export class VideoBusiness {
  constructor(
    private videoDatabase: VideoDatabase
  ) {}

  public getVideos = async (
    input: GetVideosInputDTO
  ): Promise<GetVideosOutputDTO> => {
    const videosDB = await this.videoDatabase.findVideos()

    const videos = videosDB.map(videoDB => {
      const video = new Video(
        videoDB.id,
        videoDB.creator_id,
        videoDB.title,
        videoDB.video_url,
        videoDB.likes,
        videoDB.dislikes,
        videoDB.created_at,
        videoDB.updated_at
      )

      const videoModel: VideoModel = {
        id: video.getId(),
        creatorId: video.getCreatorId(),
        title: video.getTitle(),
        videoUrl: video.getVideoUrl(),
        likes: video.getLikes(),
        dislikes: video.getDislikes(),
        createdAt: video.getCreatedAt(),
        updatedAt: video.getUpdatedAt()
      }

      return videoModel
    })

    const output: GetVideosOutputDTO = videos

    return output
  }

  public likeOrDislike = async (
    input: LikeOrDislikeInputDTO
  ): Promise<LikeOrDislikeOutputDTO> => {
    const { videoId, like, token } = input

    // validar se a id do user realmente existe no BD
    // qnd estudarmos sobre autenticação e autorização, o token válido é safe aqui
    const userId = token // por enquanto só acredite nisso <

    // validar se a id do video a ser editada realmente existe no BD
    const videoDB = await this.videoDatabase.findVideoById(videoId)

    if (!videoDB) {
      throw new NotFoundError("Vídeo não encontrado")
    }

    const video = new Video(
      videoDB.id,
      videoDB.creator_id,
      videoDB.title,
      videoDB.video_url,
      videoDB.likes,
      videoDB.dislikes,
      videoDB.created_at,
      videoDB.updated_at
    )

    const likeDislikeDB = await this.videoDatabase
      .findLikeOrDislike(userId, video.getId())

    const likeSqlite = like ? 1 : 0

    // se não encontrou o likeDislike
    // é porque a pessoa ainda não deu like nem dislike
    if (!likeDislikeDB) {
      await this.videoDatabase.createLikeDislike(
        userId,
        video.getId(),
        likeSqlite
      )

      if (like) {
        video.addLike()
        await this.videoDatabase.updateLikes(videoId, video.getLikes())

      } else {
        video.addDislike()

        await this.videoDatabase.updateDislikes(videoId, video.getDislikes())
      }
    } else if (likeDislikeDB.like) {
      if (like) {
        await this.videoDatabase.removeLikeDislike(videoId, userId)
        video.removeLike()

        await this.videoDatabase.updateLikes(videoId, video.getLikes())
      } else {
        await this.videoDatabase.updateLikeDislike(videoId, userId, likeSqlite)
        video.removeLike()
        video.addDislike()

        await this.videoDatabase.updateLikes(videoId, video.getLikes())
        await this.videoDatabase.updateDislikes(videoId, video.getDislikes())
      }

    } else {
      if (!like) {
        await this.videoDatabase.removeLikeDislike(videoId, userId)
        video.removeDislike()

        await this.videoDatabase.updateDislikes(videoId, video.getDislikes())
      } else {
        await this.videoDatabase.updateLikeDislike(videoId, userId, likeSqlite)
        video.removeDislike()
        video.addLike()

        await this.videoDatabase.updateLikes(videoId, video.getLikes())
        await this.videoDatabase.updateDislikes(videoId, video.getDislikes())
      }
    }

    return
  }
}