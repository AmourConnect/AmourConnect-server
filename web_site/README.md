# Projet AmourConnect - Frontend Site Web

Dating site to match with a man VS woman and look for his love❤️

# To start front

*If you have Docker*

*⛔ Start the Database first before*

```
docker-compose -f .\compose.yaml up -d
```


**Clean the caches if that doesn't work :**

```
docker builder prune --force
```

```
docker image prune --force
```

```
docker exec -it web_site-frontend-amourconnect-1 /bin/sh
```

**Otherwise do this manually if you don't have Docker**

```
npm install -g npm@latest && npm update && npm update --save-dev && npm install && npm run dev
```

** ⛔ For the IP request api_backend, edit the file src/lib/config.ts**