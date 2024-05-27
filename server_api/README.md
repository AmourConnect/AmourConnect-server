# Projet AmourConnect - BackEND - API in .NET Core

Dating site to match with a man VS woman and look for his love❤️

# CONFIG .env at the root of the project

```
#identifier for mail
EMAIL_USER=""
EMAIL_MDP=""
SERVICE="smtp.gmail.com"
PORT_SMTP="465"

# OAuth Google
ClientId=""
ClientSecret=""

IP_NOW_FRONTEND="http://localhost:3000"
IP_NOW_BACKENDAPI="http://localhost:5266"

# The HS256 algorithm requires a key of at least 256 bits (32 characters)
SecretKeyJWT=""

#Database
ConnectionDB="Host=localhost;Port=5433;Username=tchoulo;Password=123tchoulo123;Database=amourconnect_dev;"
```

URL Redirection in Google Console API
![Alt Text](./api_google_redirect_config_credentials.png "Config Google OAuth")

# To start API

*⛔ Start the Database first before*


*If you use Docker, edit the .env config =>*

```
IP_NOW_FRONTEND="http://localhost:3005"
IP_NOW_BACKENDAPI="http://apinetcore:5267"
ConnectionDB="Host=postgresdb;Port=5432;Username=tchoulo;Password=123tchoulo123;Database=amourconnect_dev;"
```

Start API .NET Core
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

Restore dependances
```
dotnet restore
```

*To play Migration (not necessary)*
```
dotnet tool install --global dotnet-ef && dotnet build && dotnet ef migrations add InitialCreate && dotnet ef database update
```

*Start*
```
dotnet build & dotnet run
```