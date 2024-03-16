import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '..','..', '..','.env');
dotenv.config({ path: envPath });

/**
 * Cette classe aura pour but de vérifier si on est en prod ou dev
 * pour décider si on affiche oui ou non les logs dans la console pour les responses API
 */
export class Logs
{

  private debug;

  constructor(debug: boolean) {
    this.debug = debug;
  }

  public debug_logs (): boolean
  {
    if(this.debug === true && process.env.NODE_ENV === "development")
    {
      return true;
    }
    return false;
  }

}