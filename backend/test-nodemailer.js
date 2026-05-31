const nodemailer = require("nodemailer");

async function main() {
  console.log("Starting SMTP connection test...");
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "bhanderianku123@gmail.com",
      pass: "ridvrklcwuguelzq", // spaces removed
    },
    debug: true,
    logger: true
  });

  try {
    console.log("Attempting to verify connection...");
    await transporter.verify();
    console.log("SUCCESS! The credentials are valid and Google accepted the login.");
  } catch (error) {
    console.error("FAILED! Google rejected the login.");
    console.error(error);
  }
}

main();
