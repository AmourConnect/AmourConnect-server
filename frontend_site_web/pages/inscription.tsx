//pages/Inscription.tsx
import { fetchDataFromAPI } from './api/function';
import Head from 'next/head';
import styles from '../public/css/Inscription.module.css';
import React from 'react';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // pour que le kit fonctionne
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import Header_1 from '@/src/features/layout/Header_1';
import { ThemeProvider } from 'next-themes';
import Section_assaut from '../src/features/layout/Section_assaut';
import { AuthentificationPerso } from '../authentification'; //  côté serveur
import Main_1 from '@/src/features/layout/Main_1';
import FormulaireContainer from '@/src/features/layout/FormulaireContainer';
import Button_1 from '@/src/features/layout/Button_1';
import { InscriptionForm } from '../src/class/inscription';
export default function Inscription({ apiResponse }: { apiResponse: { message: string } }) {

  const controls = useAnimation();

  const [responseData, setResponseData] = useState({
    message: '', // pour afficher un message d'erreur en temps réels
  });

  const inscriptionForm = new  InscriptionForm(setResponseData);
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    });
  }, []); // Le tableau vide signifie que cet effet ne dépend d'aucune dépendance  

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
                <h1 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'bold' }}>S'inscrire à notre site de rencontre ❤️</h1>
              <FormulaireContainer>
            {responseData.message && (
              <p style={{color:'red'}} className={styles.message}>{responseData.message}</p>
            )}
            <form onSubmit={inscriptionForm.handleSubmit}>
                <label htmlFor="email" className={styles.label}></label>
                <input type="email" id="email" 
                className={styles.input} 
                name="email"
                placeholder='Email'
                required/>

                <label htmlFor="pseudo" className={styles.label}></label>
                <input type="pseudo" id="pseudo" 
                className={styles.input} 
                name="pseudo"
                placeholder='Pseudo'
                required/>

                <label htmlFor="sexe" className={styles.label}>Sexe :</label>
                <select 
                    id="sexe" 
                    className={styles.input} 
                    name="sexe"
                    required>
                    <option value=""></option>
                    <option value="Feminin">Feminin</option>
                    <option value="Masculin">Masculin</option>
                </select>

                <label htmlFor="ville" className={styles.label}>Ville :</label>
                <select 
                    id="ville" 
                    className={styles.input} 
                    name="ville"
                    required>
                    <option value=""></option>
                    <option value="Paris">Paris</option>
                    <option value="Marseille">Marseille</option>
                    <option value="Dubai">Dubai</option>
                </select>

                <input 
                    type="date" 
                    id="date_naissance" 
                    className={styles.input} 
                    name="date_naissance"
                    required
                />

                <label htmlFor="password" className={styles.label}></label>
                <input type="password" id="password"
                className={styles.input}
                name="mot_de_passe"
                placeholder='Password'
                required />
                <Button_1>S'inscrire</Button_1>
                <br></br>
                <Link href="/connexion" className={styles.a}>
                Page Connecter
            </Link>
            </form>
            </FormulaireContainer>
                    </motion.div>
            </Main_1>
        </Section_assaut>
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