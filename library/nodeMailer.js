const nodemailer = require('nodemailer');
const nodeMailer = (req,res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "venkateshlendugure12081999@gmail.com",
                pass: "Venk@tesh143"
            }
        })

        const mailOptions = {
            from: "venkateshlendugure12081999@gmail.com",
            to: req.body.emailId,
            subject: "Thank you for registration",
            text: `Hi ${req.body.userName}
            Thank you for registration on notes 
            You have done your registration successfully
            Thank you.....................`
        }

        transporter.sendMail(mailOptions, (err, info) =>{
            if (err) {
                throw new Error('mail is not send');
            } else {
                        res.status(201).send('Registration succesful and send gmail to this mail :' + req.body.emailId);
            }
        })
    }catch (error) {
            res.status(500).send(error.message);
    }
}
module.exports = nodeMailer;