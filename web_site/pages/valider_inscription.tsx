//pages/ValiderInscription.tsx
import { fetchDataFromAPI } from './api/function';
import Head from 'next/head';
import styles from '../public/css/Valider_inscription.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css'; // pour que le kit fonctionne
import { motion, useAnimation } from 'framer-motion';
import Header_1 from '@/src/features/layout/Header_1';
import Footer_1 from '@/src/features/layout/Footer_1';
import { ThemeProvider } from 'next-themes';
import { AuthentificationPerso } from '../authentification'; //  côté serveur
import Section_assaut from '../src/features/layout/Section_assaut';
import Main_1 from '@/src/features/layout/Main_1';
import FormulaireContainer from '@/src/features/layout/FormulaireContainer';
import Button_1 from '@/src/features/layout/Button_1';
import {  ValiderInscriptionForm } from '../src/class/valider_inscription';
export default function ValiderInscription({ apiResponse }: { apiResponse: { message: string } }) {
  const [responseData, setResponseData] = useState({ message: '' });
  const controls = useAnimation();
  const router = useRouter();
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    });
  }, []); // Le tableau vide signifie que cet effet ne dépend d'aucune dépendance  
  

  const inscriptionForm = new  ValiderInscriptionForm(router, setResponseData);

      return (
      <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        <title>Inscription AmourConnect❤️</title>
        <link rel="icon" type="image/png" href="/assets/6016845_f342d.gif"/>
      </Head>
      < Header_1 />
      <Section_assaut>
          <Main_1>
          <motion.div animate={controls} initial={{ opacity: 0, y: -50 }}>
                <h1 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'bold' }}>Valider l'inscription à notre site de rencontre ❤️</h1>
            <FormulaireContainer>
            {responseData.message && (
              <p style={{color:"red"}} className={styles.message}>{responseData.message}</p>
            )}
              <form onSubmit={inscriptionForm.handleSubmit}>
                <label htmlFor="email" className={styles.label}></label>
                <input type="email" id="email"
                  className={styles.input}
                  name="email"
                  placeholder='Email'
                  defaultValue={inscriptionForm.getFormData().email}
                  onChange={inscriptionForm.handleInputChange}
                  required/>


                <label htmlFor="Token_validation_email" className={styles.label}></label>
                <input type="Token_validation_email" id="Token_validation_email"
                  className={styles.input}
                  name="Token_validation_email"
                  placeholder='Token validation Email'
                  defaultValue={inscriptionForm.getFormData().Token_validation_email}
                  onChange={inscriptionForm.handleInputChange}
                  required/>
                <Button_1>Valider l'inscription</Button_1>


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