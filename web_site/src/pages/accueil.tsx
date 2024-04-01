import { AuthStatus } from "@/Hook/type";
import Loader1 from "../app/components/Loader1";
import { useAuth } from "@/Hook/UseAuth";
import { useEffect } from "react";
import Login from '../app/components/Home/login';
import { useAccount } from "@/Hook/UseAccount";

export default function Accueil() {

    // const { account } = useAccount();

    const { status, authenticate } = useAuth();

    useEffect(() => authenticate(), []);

    if(status === AuthStatus.Unknown) {
        return (
            <Loader1 />
        );
    }

    if(status === AuthStatus.Guest) {
        return (
            <div>
                <Login />
            </div>
        );
    }

    return (
        <>
        coucou
        </>
    );

    // return (
    //   <div className="flex flex-col">
    //     {account && account.length > 0 ? (
    // account.map((user: Record<string, any>) => (
    //     <div key={user.utilisateur_id}>
    //         {user.sexe === 'Feminin' && user.photo_profil === null && (
    //             <img src="/assets/images/femme_anonyme.png" width="100" height="100" alt={user.pseudo} />
    //         )}
    //         {user.sexe === 'Masculin' && user.photo_profil === null && (
    //             <img src="/assets/images/homme_bg.png" width="100" height="100" alt={user.pseudo} />
    //         )}
    //         {user.photo_profil !== null && (
    //             <img src={user.photo_profil} width="100" height="100" alt={user.pseudo} />
    //         )}
    //         <div>{user.pseudo}</div>
    //         Date de Naissance :<div>{user.date_naissance}</div>
    //         </div>
    //       ))
    //   ) : (
    //       <div>Aucun utilisateur à afficher à cause de vos critères (âge, sexe...)</div>
    //   )}
    //   </div>
    // );

}