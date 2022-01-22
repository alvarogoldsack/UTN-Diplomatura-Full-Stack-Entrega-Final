import nodemailer from 'nodemailer';

const send = async (email, asunto, cuerpo) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.DB_HOST,
        service: process.env.MAIL_SERVICE,
        port: process.env.DB_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
  
      await transporter.sendMail({
        to: email,
        subject: asunto,
        html: cuerpo,
      });
      console.log("email enviado correctamente");
    } catch (error) {
      console.log("email no enviado");
      console.log(error);
    }
  };
  
export default {send};