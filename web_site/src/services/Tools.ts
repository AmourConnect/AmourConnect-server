export namespace servicesTools
{
    export class Tools
    {
        public static readonly API_BACKEND_URL = process.env.NEXT_PUBLIC_API_URL + '/api';
        public static GOOGLE_LOGIN_URL = Tools.API_BACKEND_URL + '/Auth/login';

        public static ConvertingADateToAge(date_of_birth: Date): number
        {
            const today = new Date();
            const birthDate = new Date(date_of_birth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }

        public static isValidDate(date: string): boolean
        {
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if (!regex.test(date)) {
                return false;
            }
        
            const d = new Date(date);
            return d instanceof Date && !isNaN(d.getTime());
        }

        public static compareByProperty<T, K extends keyof T>(a: T, b: T, prop: K): number
        {
            if (a[prop] < b[prop]) {
                return -1;
              }
              if (a[prop] > b[prop]) {
                return 1;
              }
              return 0;
        }
    }
}