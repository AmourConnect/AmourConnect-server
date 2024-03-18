export class InscriptionForm {

    private setResponseData: any;

    constructor(setResponseData: any) {
        this.setResponseData = setResponseData;
      }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // éviter de recharger la page
    
        try {
          const formDataToSend = new FormData(e.currentTarget);
          const formDataObject = Object.fromEntries(formDataToSend.entries());
          const response = await fetch('/api/inscription_traitement', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
          });
  
          const responseData = await response.json();
          this.setResponseData(responseData);
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire:', error);
        }
      };

}