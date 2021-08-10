
const sgMail = require("@sendgrid/mail")


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email, // Change to your recipient
        from: 'info@pandoradevs.com', // Change to your verified sender
        subject: 'Welcomd',
        text: `Wecome to the App , ${name}. give us feed back if you like it`,
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email, // Change to your recipient
        from: 'info@pandoradevs.com', // Change to your verified sender
        subject: 'Canceled',
        text: `The account have been Canceled , ${name}. give us feedback about why you've canceled the account`,
    })
}

module.exports = {
    sendWelcomeEmail, sendCancelEmail
}