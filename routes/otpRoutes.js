const express = require("express")
const otpRouter = express.Router()
const otpController = require("../controller/otpController")

otpRouter.post("/send-otp", otpController.sendOTP)

otpRouter.post("/verify-otp", otpController.verifyOTP)

module.exports = otpRouter