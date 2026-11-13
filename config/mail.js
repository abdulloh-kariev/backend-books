const nodemailer = require("nodemailer")

let transporter

const getTransporter = async () => {
    if(transporter) {
        return transporter
    }

    const testAccount = await nodemailer.createTestAccount()

    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    return transporter
}

module.exports = getTransporter