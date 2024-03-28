import { CustomError } from "./CustomError";

export abstract class Validator
{
    private undefinied (data: any)
    {
      if(typeof data === "undefined")
      {
        return false;
      }
      return true;
    }
    private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    private pseudoRegex = /^[a-zA-Z0-9_-]{3,10}$/;
    
    private PASSWORD_REGEX = /^(?=.*\d).{4,99}$/;

    private regexSexe = /^(Masculin|Feminin)$/;

    private regexDate = /^(?!0000)[0-9]{4}-(?!00)(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    private regexAdresse = /^[A-Za-z\s]{3,50}$/;

    private token_regex = /^[a-f0-9]{6,128}$/i;
    

    protected checkEmail(email: string): void 
    {
        if (!this.undefinied(email) || !this.emailRegex.test(email))
        {
          throw new CustomError('Invalid email', 400);
        }
    }

    protected checkPseudo(pseudo: string): void
    {
        if (!this.undefinied(pseudo) || !this.pseudoRegex.test(pseudo))
        {
          throw new CustomError('Invalid pseudo', 400);
        }
    }

    protected checkPassword(password: string): void
    {
        if (!this.undefinied(password) || !this.PASSWORD_REGEX.test(password))
        {
          throw new CustomError('Invalid password', 400);
        }
    }

    protected checkSexe(sexe: string): void
    {
        if (!this.undefinied(sexe) || !this.regexSexe.test(sexe))
        {
          throw new CustomError('Invalid sexe', 400);
        }
    }

    protected checkDate(date: string): void
    {
        if (!this.undefinied(date) || !this.regexDate.test(date))
        {
          throw new CustomError('Invalid date', 400);
        }
    }

    protected checkAdresse(adresse: string): void
    {
        if (!this.undefinied(adresse) || !this.regexAdresse.test(adresse))
        {
          throw new CustomError('Invalid adresse', 400);
        }
    }

    protected checkTokenSession(token: string): void
    {
      if (!this.undefinied(token) || !this.token_regex.test(token))
      {
        throw new CustomError('Invalid token', 400);
      }
    }
}