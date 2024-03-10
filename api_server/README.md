# Projet AmourConnect - BackEND - API PRIVE

Site de rencontre pour match avec un homme VS femme et rechercher son amour❤️

# Configuration du .env à la racine du projet



<!-- PORT_API_BACK_IN_DOCKER="3005"
NODE_ENV="development"

# identifiant pour nodemailer
EMAIL_USER=""
EMAIL_MDP=""

# IP pour l'envoye du lien du mail
IP_NOW_FRONTEND="http://192.168.1.21:3000/"

# page administration base de données
PGADMIN_DEFAULT_PASSWORD="123soleil123"
PGADMIN_DEFAULT_EMAIL="soleil@gmail.com"

# Base de données
DB_HOST="postgres-amourconnect"
DB_USER="tchoulo"
DB_PASSWORD="123tchoulo123"
DB_DATABASE="amourconnect_dev"
DIALECT_SQL="postgres"  -->



# Pour lancer l'API

Si vous avez Docker

docker-compose -f .\compose.yaml up -d


**Nettoyez les caches si ça marche pas :**
docker builder prune --force
docker image prune --force

docker exec -it amourconnect-backend-amourconnect-1 /bin/sh

**Sinon faite cela manuellement**


npm install -g npm@latest && npm update && npm update --save-dev && npm install && npm install -g sequelize-cli && sequelize db:create && sequelize db:migrate && npm start


sequelize db:seed:all // générer des données si besoin
sequelize db:migrate:undo:all // annuler une migration si besoin


*Faire un `rs` pour redémarrer le serveur manuellement si besoin*


# Pour la production :

npm install --omit=dev // pour la production