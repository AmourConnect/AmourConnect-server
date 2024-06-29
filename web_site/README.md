# Projet AmourConnect - Front Site Web

Dating site to match with a man VS woman and look for his love❤️

# To start front

*If you have Docker*

*⛔ Start the Database first before (in the folder server_api/DataBase)*

```
docker compose -f .\compose.yaml up -d
```

**Clean the caches if that doesn't work :**

```
docker builder prune --force
```

**Otherwise do this manually if you don't have Docker**

```
npm install -g npm@latest && npm update && npm update --save-dev && npm install && npm run dev
```

**☢️WARNING, you can use npm run build and start, you can only start it in a Unix/Linux OS. (You will need to modify the start port in the package.json)**