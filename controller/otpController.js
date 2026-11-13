const nodemailer = require("nodemailer")
const getTransporter = require("../config/mail")
const otpStore = require("../utils/otpStore")
const generateOtp = require("../utils/generateOtp")

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body

        if(!email) {
            return res.status(400).json({ message: "Email yuborish shart!" })
        }

        const otp = generateOtp()

        otpStore[email] = otp

        const transporter = await getTransporter()

        const info = await transporter.sendMail({
            from: '"Test" <test@example.com>',
            to: email,
            subject: "OTP code",
            text: `Sening Otp koding: ${otp}`
        })

        console.log("Xatni korish:", nodemailer.getTestMessageUrl(info))

        res.json({ message: "Otp sent", otp })
    } catch (error) {
        res.status(500).json({ message: "Server Xato!" })
    }
}

exports.verifyOTP = (req, res) => {
        const { email, otp } = req.body

        if(!email || !otp) {
            return res.status(400).json({ message: "otp va email majbur!" })
        }

        if(otpStore[email] == otp){
            delete otpStore[email]

            return res.json({ message: "Otp dan muvafaqiyatli ottiz!" })
        }

        res.status(400).json({ message: "Notogri Otp" })
}

