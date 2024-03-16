import { Validator } from "./Validator";
import { Body } from './Interface';

    export class UserValidator extends Validator
    {
        public checkRegexRegister(body: Body): void
        {
            this.checkEmail(body.email);
            this.checkPseudo(body.pseudo);
            this.checkPassword(body.mot_de_passe);
            this.checkSexe(body.sexe);
            this.checkDate(body.date_naissance);
            this.checkAdresse(body.ville);
        }
    }