import z from 'zod'

export interface LikeOrDislikeInputDTO {
  videoId: string,
  like: boolean,
  token: string
}

export type LikeOrDislikeOutputDTO = undefined

export const LikeOrDislikeSchema = z.object({
  videoId: z.string(),
  like: z.boolean(),
  token: z.string()
}).transform(data => data as LikeOrDislikeInputDTO)
