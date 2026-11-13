const express = require("express")
const cors = require("cors")
const connectDataBase = require("./config/db")
const bookRoutes = require("./routes/booksRoutes")
const userRoutes = require("./routes/usersRoutes")
const otpRoutes = require("./routes/otpRoutes")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(
    cors({
        origin: ["http://localhost:5173"],
    })
)

connectDataBase()

app.use("/api", bookRoutes)

app.use("/api", userRoutes)

app.use("/api", otpRoutes)

app.listen(PORT, () => {console.log("Server is running on" + PORT);});