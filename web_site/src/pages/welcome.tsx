"use client"
import { AuthStatus } from "@/Hook/type";
import Loader1 from "../app/components/Loader1";
import { useAuth } from "@/Hook/UseAuth";
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
export default function Welcome() {

    const { status } = useAuth();
    const router = useRouter()

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (status === AuthStatus.Unauthenticated) {
            timer = setTimeout(() => {
                router.push('/login');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [status, router]);


    if(status === AuthStatus.Authenticated) {
        return (
            <div>hey user you are connected</div>
        );
    }

    else {
        return (
            <Loader1 />
        );
    }

    //return (
    //    <div className="flex flex-col">
    //      { usersToMatch &&  usersToMatch.length > 0 ? (
    //   usersToMatch.map((user: Record<string, any>) => (
    //      <div key={user.utilisateur_id}>
    //          {user.sexe === 'Feminin' && user.photo_profil === null && (
    //              <img src="/assets/images/femme_anonyme.png" width="100" height="100" alt={user.pseudo} />
    //          )}
    //          {user.sexe === 'Masculin' && user.photo_profil === null && (
    //              <img src="/assets/images/homme_bg.png" width="100" height="100" alt={user.pseudo} />
    //          )}
    //          {user.photo_profil !== null && (
    //              <img src={user.photo_profil} width="100" height="100" alt={user.pseudo} />
    //          )}
    //          <div>{user.pseudo}</div>
    //          Date de Naissance :<div>{user.date_naissance}</div>
    //          </div>
    //        ))
    //    ) : (
    //        <div>Aucun utilisateur à afficher à cause de vos critères (âge, sexe...)</div>
    //    )}
    //    </div>
    //  );

}