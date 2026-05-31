import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    const setting = await prisma.setting.findUnique({ where: { id: "global" } });
    
    let transporter;
    
    if (setting?.smtpHost && setting?.smtpEmail && setting?.smtpPassword) {
      // Use configured SMTP (Assuming Gmail/Standard SMTP for simplicity)
      // Automatically strip spaces from App Passwords which are commonly pasted with spaces
      const sanitizedPassword = setting.smtpPassword.replace(/\s+/g, '');
      
      transporter = nodemailer.createTransport({
        host: setting.smtpHost,
        port: setting.smtpPort || 587,
        secure: setting.smtpPort === 465,
        auth: {
          user: setting.smtpEmail,
          pass: sanitizedPassword,
        },
      });
    } else {
      // Fallback to testing account
      let testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const fromAddress = setting?.smtpHost?.includes('resend') 
      ? 'onboarding@resend.dev' 
      : '"SparkSoul Metal Tech" <no-reply@sparksoulmetal.com>';

    const info = await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: "Your Verification Code",
      text: `Your OTP is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #050505; color: #f3f4f6; text-align: center;">
          <h2 style="color: #d4af37;">SparkSoul Metal Tech</h2>
          <p>Thank you for applying for a dealer account. Use the following OTP to verify your email address:</p>
          <div style="margin: 20px auto; padding: 15px; background: #121212; border: 1px solid #d4af37; display: inline-block; font-size: 24px; font-weight: bold; letter-spacing: 5px;">
            ${otp}
          </div>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
