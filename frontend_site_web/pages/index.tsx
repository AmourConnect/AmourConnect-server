// pages/index.tsx
import Head from 'next/head';
import Image from 'next/image';
import loveLogo from '../public/assets/6016845_f342d.gif';
import styles from '../public/css/Index.module.css';
import { fetchDataFromAPI } from '../pages/api/function';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { ThemeProvider } from "next-themes";
import Header_1 from '@/src/features/layout/Header_1';
import Footer_1 from '@/src/features/layout/Footer_1';
import { motion, useAnimation } from 'framer-motion';
import Section_assaut from '../src/features/layout/Section_assaut';
import { AuthentificationPerso } from '../authentification'; //  côté serveur
export default function Index() {


    const controls = useAnimation();
  
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
        <link rel="icon" type="image/png" href="/assets/6016845_f342d.gif"/>
        <title>Accueil AmourConnect❤️</title>
      </Head>
      < Header_1 />
              <Section_assaut>
                      <motion.div animate={controls} initial={{ opacity: 0, y: -50 }}>
                            <h1 style={{ fontFamily: 'serif', fontSize: '4rem', fontWeight: 'bold' }}>
                            Bienvenue sur AmourConnect❤️
                            </h1>
                              <Image src={loveLogo} alt="AmourConnect Logo" className={styles.img} width="300" height="300"/>
                              <p style={{ fontStyle: 'italic', fontSize: '2rem'}}>Trouvez votre véritable amour et construisez des moments spéciaux ensemble.</p>
                              <Link href="/connexion" className={styles.a}>
                                Commencez votre voyage amoureux
                            </Link>
                      </motion.div>
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
    const apiResponse = await fetchDataFromAPI('/auth/get/testo', 'GET', null, cookieValues);

    if (apiResponse && apiResponse.status === 200 && apiResponse.message === "Bienvenu sur l'API de AmourConnect") {
      // Si la réponse de l'API est 200, affiche la page accueil (route public)
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