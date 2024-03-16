// pages/accueil.tsx
import { fetchDataFromAPI } from './api/function';
import { motion, useAnimation } from 'framer-motion';
import Header_1 from '@/src/features/layout/Header_1';
import { ThemeProvider } from 'next-themes';
import Main_1 from '@/src/features/layout/Main_1';
import 'tailwindcss/tailwind.css';
import TinderCard from 'react-tinder-card'
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Section_assaut from '../src/features/layout/Section_assaut';
import Button_1 from '@/src/features/layout/Button_1';
import { AuthentificationPerso } from '../authentification'; //  côté serveur
export default function Accueil({ apiResponse }: { apiResponse: Record<string, any> }) {

  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    });
  }, []); // Le tableau vide signifie que cet effet ne dépend d'aucune dépendance  

  const router = useRouter();
  // Boutton Déconnexion
//   const handleLogout = () => {
//     router.push('/');
// };

  // animation catastrophique
  const { user_to_match } = apiResponse;

    const onSwipe = (direction: string) => {
        console.log('You swiped: ' + direction);
    };

    const onCardLeftScreen = (myIdentifier: string) => {
        console.log(myIdentifier + ' left the screen');
    };
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        <title>Accueil Membre AmourConnect❤️</title>
        <link rel="icon" type="image/png" href="/assets/6016845_f342d.gif"/>
      </Head>
          <motion.div animate={controls} initial={{ opacity: 0, y: -50 }} style={{userSelect:'none'}}>
      < Header_1>
      <Link href="/" style={{ textAlign: 'left', margin: '0' }}>
          Page Accueil
      </Link>
            {/* <Button onClick={handleLogout} style={{margin: '0 auto'}}>Déconnexion</Button> */}
            {/* <Button_1 onClick={handleLogout} style={{margin: '0 auto'}}>Déconnexion</Button_1> */}
      </Header_1>
      <Section_assaut>
          <Main_1>
                <h1 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 'bold' }}>Séléctionne ton amour❤️</h1>



                {user_to_match && user_to_match.length > 0 ? (
    user_to_match.map((user: Record<string, any>) => (
        <TinderCard
            key={user.utilisateur_id}
            onSwipe={(dir) => onSwipe(dir)}
            onCardLeftScreen={() => onCardLeftScreen('userCard')}
            preventSwipe={['right', 'left']}
        >
            {user.sexe === 'Feminin' && user.photo_profil === null && (
                <img src="/assets/femme_anonyme.jpg" width="100" height="100" alt={user.pseudo} />
            )}
            {user.sexe === 'Masculin' && user.photo_profil === null && (
                <img src="/assets/homme_bg.png" width="100" height="100" alt={user.pseudo} />
            )}
            {user.photo_profil !== null && (
                <img src={user.photo_profil} width="100" height="100" alt={user.pseudo} />
            )}
            <div>{user.pseudo}</div>
            Date de Naissance :<div>{user.date_naissance}</div>
        </TinderCard>
          ))
      ) : (
          <div>Aucun utilisateur à afficher à cause de vos critères (âge, sexe...)</div>
      )}



          {/* <div style={{ height: '100vh', color:'black' }}>
              <card-select message="connard">
                  {user_to_match.map((user: Record<string, any>) => (
                      <card-select-item title={user.pseudo} key={user.utilisateur_id}>
                          {user.sexe === 'Féminin' && user.photo_profil === null && (
                              <img src="/assets/femme_anonyme.jpg" width="100" height="100"  />
                              // <div></div>
                          )}
                          {user.sexe === 'Masculin' && user.photo_profil === null && (
                              <img src="/assets/homme_bg.png" width="100" height="100"  />
                              // <div></div>
                          )}
                          {user.photo_profil !== null && (
                              <img src={user.photo_profil} width="100" height="100"  />
                              // <div></div>
                          )}
                          <div>{user.pseudo}</div>
                      </card-select-item>
                  ))}
              </card-select>
          <script src="/javascript/CardSelect.js"></script>
          </div> */}





            </Main_1>
        </Section_assaut>
                    </motion.div>
        </ThemeProvider>
    </div>
);
}

export async function getServerSideProps(context?: any) {
    try {
      const { req, res } = context;
      const cookieValues = await AuthentificationPerso.recup_session_user(req);
      // on récup les données de l'API
      const apiResponse = await fetchDataFromAPI('/membre/get/user_to_match', 'GET', null, cookieValues);
  
      if (apiResponse && apiResponse.status === 200) { // l'utiliisateur est connectée
        // on lui affiche la page d'accueil
        return {
          props: {
            apiResponse,
          },
        };
      } else if (apiResponse || apiResponse.status === 403 || apiResponse.status === 404 || apiResponse.status === 401) { // sinon on le redirige vers la page de connexion
        return {
          redirect: {
            destination: '/connexion',
            permanent: false
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