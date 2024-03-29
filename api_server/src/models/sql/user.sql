-- user for migration and seeders (Sequelize) and SQL query

-- User Creation
CREATE USER tchoulo WITH PASSWORD '123tchoulo123';
GRANT CREATE TABLE, INSERT, DELETE, UPDATE, SELECT ON DATABASE amourconnect_dev TO tchoulo;