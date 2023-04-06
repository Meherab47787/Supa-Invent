const nodeMailer = require('nodemailer');

const sendEmail = async options => {
    //1. Create a Transporter
    const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.MYUSERNAME,
            pass: process.env.MYPASSWORD
        }
    })

    //2. Define the email Options


    const mailOptions = {
        from: 'Meherab Hassan <hassan47787@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    //3. Send the Email
    await transporter.sendMail(mailOptions)    
}

module.exports = sendEmail;

