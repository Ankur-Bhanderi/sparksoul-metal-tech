const nodemailer = require("nodemailer");

async function main() {
  console.log("Testing Resend SMTP connection...");
  
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: "resend",
      pass: "re_3sx1S5p4_Laq57yaMLscwVKURhgNP2ZKD",
    },
  });

  try {
    await transporter.verify();
    console.log("SUCCESS! Connected to Resend SMTP.");
    
    // Test sending an email (this might fail if the 'from' domain isn't verified in Resend)
    const info = await transporter.sendMail({
      from: 'onboarding@resend.dev', // Resend's default test address
      to: 'bhanderianku123@gmail.com', // Assuming this is their registered email
      subject: 'Resend Connection Test',
      text: 'This is a test from Resend SMTP.'
    });
    console.log("Message sent successfully:", info.messageId);
    
  } catch (error) {
    console.error("FAILED!");
    console.error(error);
  }
}

main();
