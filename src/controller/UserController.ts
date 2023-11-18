import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { GetUsersInputDTO, GetUsersSchema } from "../dtos/users/getUsers.dto";

export class UserController {
  constructor(
    private userBusiness: UserBusiness
  ) {}

  public getUsers = async (req: Request, res: Response) => {
    try {

      const input: GetUsersInputDTO = GetUsersSchema.parse({
        nameToSearch: req.query.name as string
      })

      const output = await this.userBusiness.getUsers(input)

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