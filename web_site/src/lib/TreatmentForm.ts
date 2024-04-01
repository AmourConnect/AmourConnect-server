    // export const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, setResponse: any, useCustomRouter: any, url_api: string, url_api_externe: string) =>
    // {
    //   const setResponseData = setResponse;
    //   const router = useCustomRouter;
    //     e.preventDefault();
    //     try {
    //       const formDataToSend = new FormData(e.currentTarget);
    //       const formDataObject = Object.fromEntries(formDataToSend.entries());
    //       formDataObject.url_api = url_api_externe;
    //       const response = await fetch(url_api, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formDataObject),
    //       });
  
    //       const responseData = await response.json();
    //       setResponseData(responseData);
    //       if (responseData && responseData.status === 200) {
    //         setTimeout(() => {
    //           router.reload();
    //         }, 3000);
    //       }          
    //     } catch (error) {
    //       console.error('Erreur lors de la soumission du formulaire:', error);
    //     }
    // };