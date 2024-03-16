//pages/connexion.tsx
import { fetchDataFromAPI } from './api/function';
import Head from 'next/head';
import styles from '../public/css/Connexion.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthentificationPerso } from '../authentification'; //  côté serveur
import 'tailwindcss/tailwind.css'; // pour que le kit fonctionne
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import Header_1 from '@/src/features/layout/Header_1';
import Footer_1 from '@/src/features/layout/Footer_1';
import { ThemeProvider } from 'next-themes';
import Section_assaut from '../src/features/layout/Section_assaut';
import Main_1 from '@/src/features/layout/Main_1';
import FormulaireContainer from '@/src/features/layout/FormulaireContainer';
import Button_1 from '@/src/features/layout/Button_1';
export default function Connexion({ apiResponse }: { apiResponse: { message: string } }) {

  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    });
  }, []); // Le tableau vide signifie que cet effet ne dépend d'aucune dépendance  

  const router = useRouter();

  const [responseData, setResponseData] = useState({
    message: '', // pour afficher un message d'erreur en temps réels
  });
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        setResponseData(responseData);
  
        if (responseData && responseData.status === 200 && responseData.message === "Connection completed successfully") {
          router.push('/accueil');
        } else {
          console.error('Échec de la connexion:', responseData.message);
        }
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
      }
    };

      return (
      <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        <title>Connexion AmourConnect❤️</title>
        <link rel="icon" type="image/png" href="/assets/6016845_f342d.gif"/>
      </Head>
      < Header_1 />
      <Section_assaut>
          <Main_1>
          <motion.div animate={controls} initial={{ opacity: 0, y: -50 }}>
                <h1 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'bold' }}>Se Connecter à notre site de rencontre ❤️</h1>
              <FormulaireContainer>
                {responseData && responseData.message && (
                  <p style={{color:"red"}} className={styles.message}>{responseData.message}</p>
                  )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className={styles.label}></label>
                    <input type="email" id="email" 
                    className={styles.input} 
                    name="email"
                    placeholder='Email'
                    required/>

                    <label htmlFor="password" className={styles.label}></label>
                    <input type="password" id="password"
                    className={styles.input}
                    name="mot_de_passe"
                    placeholder='Password'
                    required />
                    <Button_1 >Se connecter</Button_1>
                    <br></br>
                    <Link href="/inscription" className={styles.a}>
                    Page Inscrire
                </Link>
                <br></br>
                <Link href="/" className={styles.a}>
                    Page Accueil
                </Link>
                </form>
                    </FormulaireContainer>
                    </motion.div>
            </Main_1>
        </Section_assaut>
        <Footer_1 />
        </ThemeProvider>
      </>
    );
}

export async function getServerSideProps(context?: any) {
  try {
    const { req, res } = context;
    const cookieValues = await AuthentificationPerso.recup_session_user(req);
    // on récup les données de l'API
    const apiResponse = await fetchDataFromAPI('/auth/get/SessionStatus', 'GET', null, cookieValues);

    if (apiResponse && apiResponse.status === 200 && apiResponse.message === "User connected") { // l'utiliisateur est déjà connectée
      // on lui affiche la page d'accueil
      return {
        redirect: {
          destination: '/accueil',
          permanent: false
        },
      };
    } else if (apiResponse || apiResponse.status === 403 || apiResponse.status === 404 || apiResponse.status === 401) { // sinon on lui affiche cette page
      return {
        props: {
          apiResponse,
        },
      };
    } else {
      return {
        redirect: {
          destination: 'error/erreurAPI',
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: 'error/erreur',
        permanent: false,
      },
    };
  }
}