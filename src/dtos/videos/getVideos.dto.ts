import z from 'zod'
import { VideoModel } from '../../models/Video'

export interface GetVideosInputDTO {
  // objeto vazio, pq não precisa de input
}

export type GetVideosOutputDTO = VideoModel[]

export const GetVideosSchema = z.object({
  // objeto vazio, então não precisa de validação
}).transform(data => data as GetVideosInputDTO)
