const { z } = require("zod")

const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    age: z.number().int().min(6).optional(),
    password: z.string().min(8)
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

module.exports = { registerSchema, loginSchema }