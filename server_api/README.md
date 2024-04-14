# Projet AmourConnect - BackEND - API PRIVATE in .NET Core

Dating site to match with a man VS woman and look for his love❤️

# CONFIG .env at the root of the project

```
#identifier for mail send

EMAIL_USER="kakozdeh@gmail.com"
EMAIL_MDP="qqskngxwmreqefpm"
SERVICE="gmail"

#IP for sending the email link

IP_NOW_FRONTEND="http://192.168.1.21:3000"

#database administration page
PGADMIN_DEFAULT_PASSWORD="123soleil123"
PGADMIN_DEFAULT_EMAIL="soleil@gmail.com"

#Database
Port_db="5432"
DB_HOST="postgres-amourconnect"
DB_USER="tchoulo"
DB_PASSWORD="123tchoulo123"
DB_DATABASE="amourconnect_dev"
DIALECT_SQL="postgres"
```

# To start API

*If you have Docker*


Start API .NET Core
```
docker build . -t apinetcore
```

```
docker run -p 8081:80 -e ASPNETCORE_URLS=http://+80 apinetcore
```

For the database
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

**Otherwise do this manually if you don't have Docker**

If you use .NET Core CLI
```
dotnet restore
```

Else if you use VS
```
nuget restore
```

*To play Migration*
```
dotnet build && dotnet ef migrations add InitialCreate && dotnet ef database update
```

*Start*
```
dotnet run
```


# For production :