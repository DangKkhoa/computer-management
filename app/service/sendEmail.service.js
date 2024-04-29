const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dangkkhoa10a8@gmail.com',
      pass: 'yoeacnmsuniakxzw'
    }
});

async function sendEmailService(email, username) {    
    var loginPageLInk = 'http://localhost:3000/auth/login'
    try {
        const info = await transporter.sendMail({
            from: 'dangkkhoa10a8@gmail.com',
            to: email,
            subject: 'FROM ADMIN',
            text: 'Your account has been created',
            html: `<h1 style="color: black">Welcome! Your account has been created</h1>
                    <p style="color: black"><strong>Email: </strong>${email}</p>
                    <p style="color: black"><strong>Password: </strong>${username}</p>
                    <a href="${loginPageLInk}">${loginPageLInk}</a>
                `
        })
    
        console.log(info);
    }
    catch(err) {
        console.error(err);
    }
}



module.exports = { sendEmailService };