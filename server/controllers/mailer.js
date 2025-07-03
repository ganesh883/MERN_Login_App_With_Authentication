import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

let nodeconfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL,
      pass: ENV.PASSWORD,
    },
}

let transported = nodemailer.createTransport(nodeconfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js'
    }
})

/** POST: http://localhost:8080/api/registerMail */
export const registerMail = async (req,res) =>{
    const { username, userEmail, text, subject } = req.body;

    var email = {
        body: {
            name : username,
            intro : text || 'Welcome to Daily Tuition! we\'re very excited to have you on board.',
            outro : 'Need help, or have questions? Just replay to this email, we\'d love to help.' 
        }
    }


    var emailBody = MailGenerator.generate(email);

    let message = {
        from : ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successful",
        html: emailBody
    }

    transported.sendMail(message)
        .then(()=>{
            return res.status(200).send({msg: "You should receive and email from us."})
        })
        .catch(error => res.status(500).send({error}))
}