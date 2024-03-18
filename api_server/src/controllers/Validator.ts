export abstract class Validator
{
    private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    private pseudoRegex = /^[a-zA-Z0-9_-]{3,10}$/;
    
    private PASSWORD_REGEX = /^(?=.*\d).{4,99}$/;

    private regexSexe = /^(Masculin|Feminin)$/;

    private regexDate = /^(?!0000)[0-9]{4}-(?!00)(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    private regexAdresse = /^[A-Za-z\s]{3,50}$/;

    private token_regex = /^[a-f0-9]{128}$/;
    

    protected checkEmail(email: string): void 
    {
        if (!this.emailRegex.test(email))
        {
          throw new Error('Invalid email');
        }
    }

    protected checkPseudo(pseudo: string): void
    {
        if (!this.pseudoRegex.test(pseudo))
        {
          throw new Error('Invalid pseudo');
        }
    }

    protected checkPassword(password: string): void
    {
        if (!this.PASSWORD_REGEX.test(password))
        {
          throw new Error('Invalid password');
        }
    }

    protected checkSexe(sexe: string): void
    {
        if (!this.regexSexe.test(sexe))
        {
          throw new Error('Invalid sexe');
        }
    }

    protected checkDate(date: string): void
    {
        if (!this.regexDate.test(date))
        {
          throw new Error('Invalid date');
        }
    }

    protected checkAdresse(adresse: string): void
    {
        if (!this.regexAdresse.test(adresse))
        {
          throw new Error('Invalid adresse');
        }
    }

    protected checkTokenSession(token: string): void
    {
      if (!this.token_regex.test(token))
      {
        throw new Error('Invalid token');
      }
    }
}