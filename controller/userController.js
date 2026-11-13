const User = require("../model/User")
const { registerSchema, loginSchema } = require("../validators/userValidator")
const bcrypt = require("bcrypt")

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")

        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "server tarafida xato chiqdi!" })
    }
}

exports.registerUser = async (req, res) => {
    try {
        const validation = registerSchema.safeParse(req.body)

        if(!validation.success){
            return res.status(400).json({ message: "Xato malumotlar!" })
        }

        const { name, age, email, password } = req.body

        const existingUser = await User.findOne({ email })

        if(existingUser){
            return res.status(400).json({ message: "Bunaqa user bor!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            age,
            email,
            password: hashedPassword
        })

        res.status(201).json({ message: "User muvafaqiyatli qoshildi!" })
    } catch (error) {
        res.status(500).json({ message: "Server xatosi!" })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const validation = loginSchema.safeParse(req.body)

        if(!validation.success){
            return res.status(400).json({ message: "Xato malumotlar!" })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if(!user){
            return res.status(404).json({ message: "User topilmadi!" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({ message: "Notogri parol!" })
        }

        res.json({ message: "user muvaffaqiyatli login qildi!" })
    } catch (error) {
        res.status(500).json({ message: "Server xatosi!" })
    }
}