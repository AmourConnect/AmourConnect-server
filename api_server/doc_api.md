# Example route / Postman / PS: Server responses are in JSON


![Exemple GET](./assets/get_user_to_match.png)

![Exemple POST](./assets/post_register.png)


# AUTH | Login - Register - Welcome - Validate Registration - Session Status


## Test API /GET

-Objective of testing the API


http://localhost:5002/amourconnect/api/auth/get/testo


*- The positive message from the server:*

{ status: 200, message: 'Welcome to the AmourConnect API' }


*- The possible error message :*

{ status: 500, message: 'Internal Server Error' }

## To know if the user is connected or not /GET

http://localhost:5002/amourconnect/api/auth/get/SessionStatus


HEADER {
    KEY => Cookie-user-AmourConnect, Value => 'le cookie'
}

*- The positive message from the server:*

{ status: 200, message: 'User connected' }

*- The possible error message :*

{ status: 403, message: Session expired }
{ status: 500, message: 'Internal Server Error' }

## Process the pre-registration form /POST

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

{ status: 500, message: 'Internal Server Error' }

## Process the validation of the registration validation form /POST

http://localhost:5002/amourconnect/api/auth/post/validate_registration


HEADER {
    KEY => Cookie-user-AmourConnect, Value => 'le cookie'
}


BODY {
  "email": "pvd@gmail.com",
  "Token_validation_email":"TOKEN_RECU par email ou regarder dans la base de données dans pgadmin"
}


*- The positive message from the server:*

{ status: 200, message: 'Registration completed successfully :)' , key_secret: value_cookie.key_secret, date_expiration: value_cookie.date_expiration}

*- The possible error message :*

{ status: 500, message: 'Internal Server Error' }

## Process the connection form /POST

http://localhost:5002/amourconnect/api/auth/post/login


HEADER {
    KEY => Cookie-user-AmourConnect, Value => 'le cookie'
}

BODY {
  "email":"zbe@gmail.com",
  "mot_de_passe":"zezd"
}


*- The positive message from the server:*

{ status: 200, message: 'Connection completed successfully', key_secret: value_cookie.key_secret, date_expiration: value_cookie.date_expiration}

*- The possible error message :*

{ "status": 403, "message": "User Already connected" }
{ status: 500, message: 'Internal Server Error' }

# PRIVATE ROUTE Member PART (Must be connected) | Home Member - Profil

## Get user to match /GET

http://localhost:5002/amourconnect/api/membre/get/user_to_match

HEADER {
    KEY => Cookie-user-AmourConnect, Value => 'le cookie'
}

*- The positive message from the server:*

{ status: 200, message: `Here are users to match =>`, user_to_match: data_to_match, donnees_utilisateur_connecte: data_user }


OR


{ status: 200, message: `Unfortunately, no users found based on opposite gender, city, date of birth (between less or more than 5 years old) :/` }

*- The possible error message :*

{ status: 500, message: 'Internal Server Error' }