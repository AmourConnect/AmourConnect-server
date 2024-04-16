*Config .env in the root folder DataBase*
```
#database administration page
PGADMIN_DEFAULT_PASSWORD="123soleil123"
PGADMIN_DEFAULT_EMAIL="soleil@gmail.com"

#Database
DB_USER="tchoulo"
DB_PASSWORD="123tchoulo123"
DB_DATABASE="amourconnect_dev"
```

*Start*
```
docker-compose -f .\compose.yaml up -d
```