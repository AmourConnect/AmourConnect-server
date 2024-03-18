export class ConnexionForm {

    private setResponseData: any;
    private router: any;

    constructor(router: any, setResponseData: any) {
        this.setResponseData = setResponseData;
        this.router = router;
      }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // éviter de recharger la page
    
        try {
          const formDataToSend = new FormData(e.currentTarget);
          const formDataObject = Object.fromEntries(formDataToSend.entries());
          const response = await fetch('/api/connexion_traitement', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
          });
  
          const responseData = await response.json();
          this.setResponseData(responseData);
          if (responseData && responseData.status === 200 && responseData.message === "Connection completed successfully") {
            this.router.push('/accueil');
          }
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire:', error);
        }
      };

}