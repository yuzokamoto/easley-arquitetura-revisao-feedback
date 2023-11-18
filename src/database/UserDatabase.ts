import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public findUsers = async (nameToSearch?: string): Promise<UserDB[]> => {
    if (nameToSearch) {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .where("name", "LIKE", `%${nameToSearch}%`)

      return result

    } else {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)

      return result
    }
  }
}