import express from 'express'
import { UserController } from '../controller/UserController'
import { UserDatabase } from '../database/UserDatabase'
import { UserBusiness } from '../business/UserBusiness'

export const userRouter = express.Router()

const userController = new UserController(
  new UserBusiness(
    new UserDatabase()
  )
)

userRouter.get("/", userController.getUsers)