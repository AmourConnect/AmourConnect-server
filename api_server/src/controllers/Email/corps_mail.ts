import path from 'path';
import dotenv from 'dotenv';
const envPath = path.resolve(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: envPath });

export namespace AuthMail
{

  export const corps_inscription_temporaire = async (pseudo: string, tokenVerifEmail: string) =>
  {
  
      const corps = 
      '<html>\
      <head>\
        <style>\
          body {\
            font-family: Arial, sans-serif;\
            background-color: #f5f5f5;\
            padding: 20px;\
          }\
          .container {\
            max-width: 600px;\
            margin: 0 auto;\
            padding: 20px;\
            background-color: #fff;\
            border-radius: 5px;\
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
          }\
          .header {\
            color: green;\
            font-size: 24px;\
            margin-bottom: 20px;\
          }\
          .link {\
            text-decoration: none;\
            color: #007bff;\
            font-weight: bold;\
          }\
          .signature {\
            margin-top: 30px;\
            font-style: italic;\
          }\
        </style>\
      </head>\
      <body>\
        <div class=\'container\'>\
          <p class=\'header\'>Salut ' + pseudo + ' 😎</p>\
          <p class=\'signature\'>Cordialement, <a class=\'link\' href=\'' + process.env.IP_NOW_FRONTEND + 'valider_inscription?token_verif_email=' + tokenVerifEmail + '\'>Clique ici pour valider l\'inscription 🫀</a></p>\
        </div>\
      </body>\
    </html>';
    
      return corps;
    }
  
  
  
    export const corps_inscription_validation = async (pseudo: string) =>
    {
      const corps = 
      '<html>\
      <head>\
        <style>\
          body {\
            font-family: Arial, sans-serif;\
            background-color: #f5f5f5;\
            padding: 20px;\
          }\
          .container {\
            max-width: 600px;\
            margin: 0 auto;\
            padding: 20px;\
            background-color: #fff;\
            border-radius: 5px;\
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
          }\
          .header {\
            color: green;\
            font-size: 24px;\
            margin-bottom: 20px;\
          }\
          .link {\
            text-decoration: none;\
            color: #007bff;\
            font-weight: bold;\
          }\
          .signature {\
            margin-top: 30px;\
            font-style: italic;\
          }\
        </style>\
      </head>\
      <body>\
        <div class=\'container\'>\
          <p class=\'header\'>Salut ' + pseudo + ' 😎</p>\
          <p class=\'signature\'>Merci de ton inscription, Amuse toi bien sur notre site, <a class=\'link\' href=\'' + process.env.IP_NOW_FRONTEND + 'accueil' + '\'>AmourConnect ❤️</a></p>\
          <p class=\'signature\'>Cordialement,AmourConnect 🥰</p>\
        </div>\
      </body>\
    </html>';
    
      return corps;
  
    }
}