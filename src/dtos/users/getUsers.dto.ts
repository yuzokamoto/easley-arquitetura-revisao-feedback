import z from 'zod'
import { UserModel } from '../../models/User'

export interface GetUsersInputDTO {
  nameToSearch?: string
}

export type GetUsersOutputDTO = UserModel[]

export const GetUsersSchema = z.object({
  nameToSearch: z.string().min(1).optional()
}).transform(data => data as GetUsersInputDTO)