-- l'utilisateur pour la migration et seeders (Sequelize) et requête SQL

-- Création de l'utilisateur
CREATE USER tchoulo WITH PASSWORD '123tchoulo123';
GRANT CREATE TABLE, INSERT, DELETE, UPDATE, SELECT ON DATABASE amourconnect_dev TO tchoulo;