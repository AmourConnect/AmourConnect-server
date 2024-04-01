import { AuthStatus } from "@/Hook/type";
import Loader1 from "../app/components/Loader1";
import { useAuth } from "@/Hook/UseAuth";
import { useEffect } from "react";

export default function Accueil() {

    const { status, authenticate } = useAuth();

    useEffect(() => authenticate(), [])

    if(status === AuthStatus.Unknown) {
        return (
            <Loader1 />
        );
    }

    if(status === AuthStatus.Guest) {
        return (
            <div>
                pas connectée
            </div>
        );
    }

    return (
        <>
        coucou
        </>
    );
}

    // const { user_to_match } = userToMatchResponse;

    // return (
    //   <div className="flex flex-col">
    //     {user_to_match && user_to_match.length > 0 ? (
    // user_to_match.map((user: Record<string, any>) => (
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

// export async function getServerSideProps(context?: any) {

//     const session = new Cookie_Session();
//     const sessionResponse = await session.CheckSessionUser(context);
  
//     if ('redirect' in sessionResponse) {
//         return sessionResponse;
//     }

    
//     const userToMatchResponse = await session.RequestApi(context.req,"/membre/get/user_to_match", 'GET', null);
//     return {
//         props: {
//           userToMatchResponse,
//         },
//       };
// }