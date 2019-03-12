/**
* @author Eneh, James Erozonachi
*
* @description A module that holds Application constant values
*
* */
import nodemailer from 'nodemailer';

export default {
  messanger() {
    const transporter = nodemailer.createTransport({ //Source: https://scotch.io/tutorials/nodejs-cron-jobs-by-examples
      service: "gmail",
      auth: {
        user: "noreply.politicong@gmail.com",
        pass: "09063912145"
      }
    });
    return transporter;
  },

  sendOtp(messanger, info) {
    const sendOtp = new Promise((resolve, reject) => {
      const reminderMsg = {
        from: "Politico NG - noreply.politicong@gmail.com",
        to: info.email,
        subject: 'Password reset OTP',
        text: `Your password reset OTP is: ${info.pass}`,
      };
      messanger.sendMail(reminderMsg, (error, info) => {
          if (error) {
            reject(error);
          }
          else if (info) {
            resolve(info);
          }
      });
    });
    return sendOtp;
  }
}
