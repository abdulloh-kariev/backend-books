const express = require("express")
const userRouter = express.Router()
const userController = require("../controller/userController")

userRouter.get("/users", userController.getUsers)

userRouter.post("/users/register", userController.registerUser)

userRouter.post("/users/login", userController.loginUser)

module.exports = userRouter