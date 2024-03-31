import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

const envPath = path.resolve(__dirname, '..','..', '..','.env');
dotenv.config({ path: envPath });

export class CustomError extends Error 
{
  constructor
  (
    message: string,
    public statusCode: number
  ) 
  {
    super(message);
  }
}

export const error_msg_api = (error: any, res: any) =>
{
  if (error.statusCode) 
  {
    res.status(error.statusCode).json({ status: error.statusCode, message: error.message });
  }
  else 
  {
    if(process.env.NODE_ENV === "development")
    {
      console.error(error);
    }
    else
    {
      const logFilePath = path.join(__dirname, 'Log.txt');

      fs.appendFile(logFilePath, `Error: ${error}\n`, (err: any) => {
        if (err) {
          console.error(`Error writing to log file: ${err}`);
        }
      });
    }
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
}