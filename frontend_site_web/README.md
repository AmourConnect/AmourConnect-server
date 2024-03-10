# Projet AmourConnect - Frontend

Site de rencontre pour match avec un homme VS femme et rechercher son amour❤️

# Pour lancer le front

Si vous avez Docker

docker-compose -f .\compose.yaml up -d


**Nettoyez les caches si ça marche pas :**
docker builder prune --force
docker image prune --force

docker exec -it amourconnect_frontend-frontend-amourconnect-1 /bin/sh

**Sinon faite cela manuellement**

npm install -g npm@latest && npm update && npm update --save-dev && npm install && npm run dev

# Pour la prod
npm run build
npm start