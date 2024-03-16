import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
const envPath = path.resolve(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: envPath });

export class ConfigEmail 
{
  private transporter: nodemailer.Transporter<SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_MDP,
      },
    });
  }

  private createMailOptions(destinataire: string, sujet: string, corps: string): nodemailer.SendMailOptions {
    return {
      from: process.env.EMAIL_USER,
      to: destinataire,
      subject: sujet,
      html: corps,
    };
  }

  protected sendEmail(destinataire: string, sujet: string, corps: string): void {
    const mailOptions = this.createMailOptions(destinataire, sujet, corps);

    this.transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
  }
}