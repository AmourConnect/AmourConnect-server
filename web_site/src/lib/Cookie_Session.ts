import { serialize, parse } from 'cookie';
import dotenv from 'dotenv';


dotenv.config();
const IP_API_BACKEND = process.env.IP_API_BACKEND;


interface responseAPI
{
    key_secret: string;
    date_expiration: Date;
}


export default class Cookie_Session
{
    public async create_cookie(responseAPI: responseAPI)
    {

        const session = responseAPI.key_secret;
        const expires = responseAPI.date_expiration;

        const expirationDate = new Date(expires);

        const maxAgeInSeconds = Math.floor((expirationDate.getTime() - Date.now()) / 1000);

        const myCookie = serialize('Cookie-user-AmourConnect', session, {
            path: '/',
            maxAge: maxAgeInSeconds,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict'
          });

        return myCookie;
    }

    public async get_cookie (req: any)
    {
        const cookies = parse(req.headers.cookie || '');
        const sessionData = cookies['Cookie-user-AmourConnect'] || null;

        return sessionData;
    }

    public async RequestApi(req: any, URL_API: string, type_method: string, requestBody?: any) 
    {
        try {
          const cookie = await this.get_cookie(req);
          const headers = new Headers({
            'Cookie-user-AmourConnect': typeof cookie === 'string' ? cookie : '',
            'Content-Type': 'application/json'
          });
          
          const response = await fetch(IP_API_BACKEND + URL_API, {
            method: type_method,
            headers: headers,
            body: requestBody ? JSON.stringify(requestBody) : undefined,
          });
      
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Erreur lors de la récupération des données de l\'API', error);
          return null;
        }
    }

    public async CheckSessionUser(context: any)
    {
        const apiResponse = await this.RequestApi(context.req,"/auth/get/SessionStatus", 'GET', null);

        if (apiResponse && apiResponse.status === 200) {
            return {
              props: {
                apiResponse,
              },
            };
        } 
        else {
            return {
              redirect: {
                destination: '/login',
                permanent: false,
              },
            };
        }
    }

    public async RedirectUserIfConnectInRouteSession(context : any)
    {
      const apiResponse = await this.RequestApi(context.req,"/auth/get/SessionStatus", 'GET', null);

      if (apiResponse && apiResponse.status === 200) {
          return {
            redirect: {
              destination: '/accueil',
              permanent: false,
            },
          };
      } 
      else {
          return {
            props: {
              apiResponse,
            },
          };
      }
    }
}