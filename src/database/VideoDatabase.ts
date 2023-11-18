import { LikeDislikeDB, VideoDB } from "../models/Video"
import { BaseDatabase } from "./BaseDatabase"

export class VideoDatabase extends BaseDatabase {
  public static TABLE_VIDEOS = "videos"
  public static TABLE_LIKES_DISLIKES = "likes_dislikes"

  public findVideos = async (): Promise<VideoDB[]> => {
    const result: VideoDB[] = await BaseDatabase
      .connection(VideoDatabase.TABLE_VIDEOS)
      .select()

    return result
  }

  public findVideoById = async (id: string): Promise<VideoDB | undefined> => {
    const [result]: VideoDB[] = await BaseDatabase
      .connection(VideoDatabase.TABLE_VIDEOS)
      .select()
      .where({ id })

    return result
  }

  public findLikeOrDislike = async (
    userId: string,
    videoId: string
  ): Promise<LikeDislikeDB | undefined> => {
    const [result]: LikeDislikeDB[] = await BaseDatabase
      .connection(VideoDatabase.TABLE_LIKES_DISLIKES)
      .select()
      .where({
        user_id: userId,
        video_id: videoId
      })

    return result
  }

  public createLikeDislike = async (
    userId: string,
    videoId: string,
    like: number
  ): Promise<void> => {
    await BaseDatabase
      .connection(VideoDatabase.TABLE_LIKES_DISLIKES)
      .insert({
        user_id: userId,
        video_id: videoId,
        like
      })
  }

  public updateLikes = async (
    videoId: string,
    likes: number
  ): Promise<void> => {
    await BaseDatabase
      .connection(VideoDatabase.TABLE_VIDEOS)
      .update({ likes })
      .where({ id: videoId })
  }

  public updateDislikes = async (
    videoId: string,
    dislikes: number
  ): Promise<void> => {
    await BaseDatabase
      .connection(VideoDatabase.TABLE_VIDEOS)
      .update({ dislikes })
      .where({ id: videoId })
  }

  public removeLikeDislike = async (
    videoId: string,
    userId: string
  ): Promise<void> => {
    await BaseDatabase
      .connection(VideoDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        video_id: videoId,
        user_id: userId
      })
  }

  public updateLikeDislike = async (
    videoId: string,
    userId: string,
    like: number
  ): Promise<void> => {
    await BaseDatabase
      .connection(VideoDatabase.TABLE_LIKES_DISLIKES)
      .update({
        like
      })
      .where({
        video_id: videoId,
        user_id: userId
      })
  }
}