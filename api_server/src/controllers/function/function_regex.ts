export namespace RegEXValidator
{

  
  export function isValidEmail(email: any, res: any)
{
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(email === null || email === undefined) {
      res.status(400).json({ status: 400, message:'le paramètre email est manquant (null ou undefined)' });
    }
    else {
        if(emailRegex.test(email)){
          return true;
        }else{
          res.status(400).json({ status: 400, message:'regex L\'email n\'est pas correcte' });
        }
    }
}

export function isValidPseudo(pseudo: any, res: any) {
  const pseudoRegex = /^[a-zA-Z0-9_-]{3,10}$/;
    if(pseudo === null || pseudo === undefined) {
      res.status(400).json({ status: 400, message:'le paramètre pseudo est manquant (null ou undefined)' });
    }else{
      if(pseudoRegex.test(pseudo)){
        return true;
      }else{
        res.status(400).json({ status: 400, message:'la regex Pseudo n\'est pas correcte, un pseudo de 3 à 10 caractères (A-z-0-9)' });
      }
    }
  }
  
  export function isValidPassword (password: any, res: any) {
    const PASSWORD_REGEX = /^(?=.*\d).{4,99}$/; // mot de passe compris entre 4 et 99 caractères
    if(password === null || password === undefined) {
      res.status(400).json({ status: 400, message:'le paramètre mot_de_passe est manquant (null ou undefined)' });
    }else{
      if(PASSWORD_REGEX.test(password)){
        return true;
      }else {
        res.status(400).json({ status: 400, message:'la regex mot_de_passe n\'est pas correcte un mot de passe de 4 à 99 caractères est requis' });
      }
    }
  }

  
  export function isValidToken(Token_validation_email: any, res: any) {
    const token_regex = /^[a-f0-9]{128}$/; // REGEX FOR TOKEN
    if(Token_validation_email === undefined || Token_validation_email === null) {
      res.status(400).json({ status: 400, message: 'paramètre Token manquant (null ou undefined)' });
    }else{
      if(token_regex.test(Token_validation_email)) {
        return true;
      }else {
        res.status(400).json({ status: 400, message:'la regex token n\'est pas valide' });
      }
    }
  }
  
  
  export function isValidVille(ville: any, res: any) {
    const regexVille = /^[A-Za-z\s]{3,50}$/;
    if(ville === undefined || ville === null) {
      res.status(400).json({ status: 400, message: 'le paramètre ville est manquant (null ou undefined)' });
    }else {
        if(regexVille.test(ville)) {
          return true;
        }else{
          res.status(400).json({ status: 400, message:'la regex ville n\'est pas valide (3, 50 caractères)' });
        }
      }
  }


  export function isValidDate(date: any, res: any) {
    const regexDate = /^(?!0000)[0-9]{4}-(?!00)(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
      if(date === undefined || date === null) {
        res.status(400).json({ status: 400, message: 'le paramètre date de naissance est manquant (null ou undefined)' });
      }else {
        if(regexDate.test(date)) {
          return true;
        }else{
          res.status(400).json({ status: 400, message:'la regex date de naissance n\'est pas valide (YYYY-MM-DD)' });
        }
      }
    }
    
    
    export function isValidSexe(sexe: any, res: any) {
      const regexSexe = /^(Masculin|Feminin)$/;
      if(sexe === undefined || sexe === null) {
        res.status(400).json({ status: 400, message: 'le paramètre sexe est manquant (null ou undefined)' });
      }else {
        if(regexSexe.test(sexe)) {
          return true;
        }else{
          res.status(400).json({ status: 400, message:'la regex sexe n\'est pas valide Masculin|Feminin' });
        }
      }
    }


  }