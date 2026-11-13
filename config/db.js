const mongoose = require("mongoose")
require("dotenv").config()

async function connectDataBase(){
    try {
        await mongoose.connect(process.env.DATABASE_URL)

        console.log("database ulandi");
    } catch (error) {
        console.log("data base ulanvotganida xatolik chiqdi:", error.message);
    }
}

module.exports = connectDataBase