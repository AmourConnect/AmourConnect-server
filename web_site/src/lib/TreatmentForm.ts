export default class TreatmentForm
{
    private setResponseData: any;
    private router: any;

    public handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        try {
          const formDataToSend = new FormData(e.currentTarget);
          const formDataObject = Object.fromEntries(formDataToSend.entries());
          const response = await fetch('/api/tratmentform', {
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