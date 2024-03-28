"use client";
export class  ValiderInscriptionForm {
    private formData: any;
    private router: any;
    private setResponseData: any;
  
    constructor(router : any, setResponseData: any) {
      this.router = router;
      this.setResponseData = setResponseData;
      this.formData = {
        email: '',
        Token_validation_email: ''
      };
    }
  
    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      this.formData = {
        ...this.formData,
        [name]: value,
      };
    };
  
    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const response = await fetch('/api/valider_inscription_traitement', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });
  
        const responseData = await response.json();
  
        this.setResponseData(responseData);
        if (responseData && responseData.status === 200 && responseData.message === "Registration completed successfully :)") {
          this.router.push('/connexion');
        }
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
      }
    };
  
    getFormData = () => this.formData;
  }