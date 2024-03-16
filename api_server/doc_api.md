# Example route / Postman / PS: Server responses are in JSON


![Exemple GET](./assets/get_accueil_membre.png)

![Exemple POST](./assets/post_register.png)


# AUTH| Login - Register - Welcome - Validate Registration - Session Status


## Test API /GET

-Objective of testing the API


http://localhost:5002/amourconnect/api/auth/get/testo


*- The positive message from the server:*

{ status: 200, message: 'Welcome to the AmourConnect API' }


*- The possible error message :*

<!-- ## Connaître l'état de session de l'utilisateur /GET

http://localhost:5002/amourconnect/api/auth/get/etat_session


HEADER {
    KEY => Cookie-user-AmourConnect, Value => 'le cookie'
}

*- The positive message from the server:*

{ status: 200, message: 'Utilisateur connectée' }

OU

{ status: 403, message: `L'utilisateur n'est pas connecté` }
{ status: 401, message: 'Cookie AmourConnect n'existe pas' }
{ status: 404, message: 'Vous n'êtes pas connectée' }
{ status: 403, message: 'Cookie Utilisateur expiré' }

*- The possible error message :*

{ status: 500, message: 'Erreur interne du serveur -_-' } -->


## Traiter le formulaire de pré-inscription /POST

http://localhost:5002/amourconnect/api/auth/post/register


HEADER {
    KEY => Cookie-user-AmourConnect, Value => 'le cookie'
}

BODY {
  "pseudo": "djgang",
  "email": "pvd@gmail.com",
  "mot_de_passe": "motdepasse123",
  "ville": "Paris",
  "date_naissance": "1999-12-24",
  "sexe": "Feminin"
}

*- The positive message from the server:*

{ status: 200, message: 'Pre-Registration completed successfully and send email to validate registration' }

*- The possible error message :*


<!-- ## Traiter la validation du formulaire validation inscription /POST

http://localhost:5002/amourconnect/api/auth/post/valider_inscription


HEADER {
    KEY => Cookie-user-AmourConnect, Value => 'le cookie'
}


BODY {
  "email": "pvd@gmail.com",
  "Token_validation_email":"TOKEN_RECU par email ou regarder dans la base de données dans phpmyadmin"
}


*- The positive message from the server:*

{ status: 200, message: 'Inscription finie avec succès :)' , cle_secret: value_cookie.cle_secret, date_expiration: value_cookie.date_expiration}

*- The possible error message :*

{ status: 400, message: 'Token expiré'}
{ status: 400, message:'le paramètre email est manquant (null ou undefined)' }
{ status: 400, message:'regex L'email n'est pas correcte' }
{ status: 400, message: 'paramètre Token manquant (null ou undefined)' }
{ status: 400, message:'la regex token n'est pas valide' }
{ status: 404, message: 'Email ou Token invalide pour valider l'inscription' }
{ status: 500, message: 'Une erreur serveur' }
{ status: 500, message: 'Erreur interne du serveur -_-' } -->


<!-- ## Traiter le formulaire connexion /POST

http://localhost:5002/amourconnect/api/auth/post/connexion


HEADER {
    KEY => Cookie-user-AmourConnect, Value => 'le cookie'
}

BODY {
  "email":"zbe@gmail.com",
  "mot_de_passe":"zezd"
}


*- The positive message from the server:*

{ status: 200, message: 'Connexion effectuée avec succès', cle_secret: value_cookie.cle_secret, date_expiration: value_cookie.date_expiration}

*- The possible error message :*

{ status: 400, message:'le paramètre email est manquant (null ou undefined)' }
{ status: 400, message:'regex L'email n'est pas correcte' }
{ status: 400, message:'le paramètre mot_de_passe est manquant (null ou undefined)' }
{ status: 400, message:'la regex mot_de_passe n'est pas correcte un mot de passe de 4 à 99 caractères est requis' }
{ status: 401, message: 'Mot de passe incorrecte' }
{ status: 404, message: 'L'utilisateur n'existe pas' }
{ status: 500, message: 'Erreur interne du serveur -_-' }


# PARTIE Membre ROUTE PRIVE (Faut être connectée) | Accueil Membre - Profil

## Afficher page Accueil Membre /GET

http://localhost:5002/amourconnect/api/membre/get/page_accueil

HEADER {
    KEY => Cookie-user-AmourConnect, Value => 'le cookie'
}

*- The positive message from the server:*

{
status: 200,
message: `Utilisateur bien connecté, affiche la page accueil membre. Voici des utilisateurs pour matcher => `,
user_to_match: user_to_match,
donnees_utilisateur_connecte: donnees_utilisateur_connecte
}

OU

{
status: 200,
message: `Utilisateur bien connecté. Malheureusement, aucun utilisateur trouvé en fonction du sexe opposé, ville, date de naissance (entre moins ou plus de 5 ans) :/`
}

*- The possible error message :*

{ status: 500, message: 'Erreur interne du serveur -_-' }
{ status: 403, message: 'Cookie Utilisateur expiré' }
{ status: 404, message: 'Vous n\'êtes pas connectée' }
{ status: 401, message: 'Cookie AmourConnect n\'existe pas' } -->