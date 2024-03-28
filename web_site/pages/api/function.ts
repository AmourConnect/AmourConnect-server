// pages/api/function.ts
import dotenv from 'dotenv';
dotenv.config();
const IP_API_BACKEND = process.env.IP_API_BACKEND;
// on requête l'API REST qui se trouve dans un autre conteneur Docker
export const fetchDataFromAPI = async (URL_API: string, type_method: string, requestBody?: any, cookieValues?: any) => {
  try {
    const headers = new Headers({
      'Cookie-user-AmourConnect': typeof cookieValues === 'string' ? cookieValues : '',
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
};