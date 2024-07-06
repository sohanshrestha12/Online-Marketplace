import env from "../../config/env";
import nodemailer from "nodemailer";
import CustomError from "../../utils/Error";
import otpGenerator from "otp-generator";


export const sendVerificationEmail = async (userEmail: string, otp: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      service: "Gmail",
      auth: {
        user: env.authEmail,
        pass: env.authPassword,
      },
    });
    const mailOptions = {
      from: env.authEmail,
      to: userEmail,
      subject: "Verify Your Email",
      text: `Your OTP code from GrandBazzar email verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email");
    console.log(error);
    throw new CustomError("Error sending email", 400);
  }
};

export function generateOtp() {
  return otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
}