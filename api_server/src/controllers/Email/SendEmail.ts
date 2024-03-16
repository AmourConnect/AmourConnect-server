import { ConfigEmail } from "./ConfigEmail";
import { AuthMail } from "./corps_mail";
import { Body, Session } from '../Interface';

export class SendEmail extends ConfigEmail
{

    public async SendUserMailInscriptionConfirmation (value_cookie: Session, body: Body): Promise<void>
    {
        const corps = await AuthMail.corps_inscription_temporaire(body.pseudo, value_cookie.key_secret);
        await this.sendEmail(body.email, 'Valider Inscription AmourConnect ❤️', corps);
    }

}