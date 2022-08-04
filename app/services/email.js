var nodemailer = require('nodemailer');

exports.sendEmail = async (surveyLink, userEmail) => {
  return await new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      name: "teamnine",
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'teamnineproject2@gmail.com',
        pass: 'Naveen@12',
        clientId: '57486508966-6u0a27pgpkomf25v38hfe12oamrdnbfg.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04Z0sBKKvXLxkCgYIARAAGAQSNwF-L9IrQBOw6d193ITgQJnoASA9boyweFfz7pESUI7BwcrQIXvbFoaHV7NyLgrBWUJZ0Q1KkWw'
      }
    });

    var mailOptions = {
      from: 'teamnineproject2@gmail.com',
      to: userEmail,
      subject: 'Complete Survey',
      text: surveyLink
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        resolve(false)
      } else {
        console.log("email sent: %s", info);

        resolve(true)
      }
    });
  })
}






