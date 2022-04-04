const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    //host: 'smtp.gmail.com',
    service: "hotmail",
    //port: 465,
    auth: {
        user: 'htmlteachingtool@outlook.com',
        pass: 'Humzah#999'
    }
});

module.exports = {

    verificationEmail: async (senderAddress, link) => {
        let error = false;
        try {
            await transporter.sendMail({
                from: '"HTMLearning no reply" <htmlteachingtool@outlook.com>',
                to: senderAddress,
                subject: "Verify Email",
                html: `Please verify your email by clicking <a href="${link}">here</a> <br/>
                This email is valid for only one hour.`
            });
        } catch (err) {
            error = true;
        }

        return error;
    },
    forgotPasswordEmail: async (senderAddress, link) => {
        let error = false;
        try {
            await transporter.sendMail({
                from: '"HTMLearning no reply" <htmlteachingtool@outlook.com>',
                to: senderAddress,
                subject: "Reset Password",
                html: `Please reset your password by clicking <a href="${link}">here</a> <br/>
                This email is valid for only one hour.`
            });
        } catch (err) {
            error = true;
        }

        return error;
    }
}