import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
const envPath = path.resolve(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: envPath });

// Configuration du service d'envoi d'e-mails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_MDP,
  },
});

// Fonction pour envoyer un e-mail
export function envoyerEmail(destinataire: string, sujet: string, corps: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinataire,
    subject: sujet,
    html: corps,
  };

  transporter.sendMail(mailOptions, (error: any, info:any) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    } else {
      console.log('E-mail envoyé avec succès :', info.response);
    }
  });
}