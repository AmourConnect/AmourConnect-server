# Projet AmourConnect - BackEND - API in .NET Core

Dating site to match with a man VS woman and look for his love❤️

# CONFIG .env at the root of the project

```
#identifier for nodemailer

EMAIL_USER="kakozdeh@gmail.com"
EMAIL_MDP="qqskngxwmreqefpm"
SERVICE="gmail"

IP_NOW_FRONTEND="http://192.168.1.21:3000"

#Database
ConnectionDB="Host=localhost;Port=5433;Username=tchoulo;Password=123tchoulo123;Database=amourconnect_dev"
```

# To start API

*If you have Docker*


Start API .NET Core
```
docker-compose -f .\compose.yaml up -d
```

OR
```
docker build . -t apinetcore
```

```
docker run -p 8081:80 -e ASPNETCORE_URLS=http://+80 apinetcore
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
dotnet tool install --global dotnet-ef && dotnet build && dotnet ef migrations add InitialCreate && dotnet ef database update
```

*Start*
```
dotnet run
```

*Upgrade all dependances*
```
dotnet upgrade-assistant
```


# For production :