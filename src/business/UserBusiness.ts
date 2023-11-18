import { UserDatabase } from "../database/UserDatabase";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/users/getUsers.dto";
import { User, UserModel } from "../models/User";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase
  ) {}

  public getUsers = async (
    input: GetUsersInputDTO
  ): Promise<GetUsersOutputDTO> => {
    const { nameToSearch } = input

    const usersDB = await this.userDatabase.findUsers(nameToSearch)

    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.created_at
      )

      const userModel: UserModel = {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        createdAt: user.getCreatedAt()
      }

      return userModel
    })

    const output: GetUsersOutputDTO = users

    return output
  }
}