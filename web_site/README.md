# Projet AmourConnect - Frontend Site Web

Dating site to match with a man VS woman and look for his love❤️

# To start front

*Set .env in the root folder*

```
NEXT_PUBLIC_API_URL="http://localhost:5266"
```

*If you have Docker*

*⛔ Start the Database first before*

```
docker build --build-arg NEXT_PUBLIC_API_URL=http://localhost:5266 --build-arg PORT=3005 --build-arg IP_FRONT=http://localhost:3005 -t web_site_amourconnect -f Dockerfile.node_frontend .
```

```
docker run --name web_site_amourconnect --network database_amour_connect -p 3005:3005 web_site_amourconnect
```

**Clean the caches if that doesn't work :**

```
docker builder prune --force
```

```
docker image prune --force
```

**Otherwise do this manually if you don't have Docker**

```
npm install -g npm@latest && npm update && npm update --save-dev && npm install && npm run dev
```