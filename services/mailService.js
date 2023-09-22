const nodemailer = require("nodemailer");

module.exports = {
  sendEmail: async function () {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "affaqahmad411@gmail.com",
        pass: "qchnzodxwqhtlotf",
      },
    });

    const mailOptions = {
      from: "affaqahmad411@gmail.com",
      to: "newemail@yopmail.com",
      subject: "Email Service Check",
      text: "Email Service",
    };

    console.log("check 1");

    transporter.sendMail(mailOptions, function (error, info) {
      console.log("check 1");
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log("Email sent: " + info.response);
        return "sent!";
        // do something useful
      }
    });
  },
};
