# Projet AmourConnect - BackEND - API PRIVE

Dating site to match with a man VS woman and look for his love❤️

# Config .env at the root of the project


`
PORT_API_BACK_IN_DOCKER="3005"
NODE_ENV="development"

#identifier for nodemailer
EMAIL_USER=""
EMAIL_MDP=""

#IP for sending the email link
IP_NOW_FRONTEND="http://192.168.1.21:3000/"

#database administration page
PGADMIN_DEFAULT_PASSWORD="123soleil123"
PGADMIN_DEFAULT_EMAIL="soleil@gmail.com"

#Database
DB_HOST="postgres-amourconnect"
DB_USER="tchoulo"
DB_PASSWORD="123tchoulo123"
DB_DATABASE="amourconnect_dev"
DIALECT_SQL="postgres" 
`


# To start API

*If you have Docker*

`docker-compose -f .\compose.yaml up -d`

**Clean the caches if that doesn't work :**
`docker builder prune --force`
`docker image prune --force`

`docker exec -it api_server-backend-amourconnect-1 /bin/sh`

**Otherwise do this manually if you don't have Docker**


`npm install -g npm@latest && npm update && npm update --save-dev && npm install && npm install -g sequelize-cli && sequelize db:create && sequelize db:migrate && npm start`


*Generate data if necessary*
`sequelize db:seed:all`

*cancel a migration if necessary*
`sequelize db:migrate:undo:all`


*Do an `rs` to restart the server manually if necessary*


# For production :