const nodemailer = require("nodemailer");

//node mailer 환경 설정
const config = {
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "xozlfl789@daum.net",
    pass: "imkoxuhcbsxlookv",
  },
};

const sendEmail = async (data) => {
  //Pormise 객체로 반환.
  return new Promise(async (resolve, reject) => {
    let tp = nodemailer.createTransport(config);
    try {
      let result = await tp.sendMail(data);
      console.log("메일성공", result);
      resolve(result);
    } catch (err) {
      console.log("메일실패", err);
      reject(err);
    }
  });
};

module.exports = {
  sendEmail,
};
