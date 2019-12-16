CREATE DATABASE movies;

USE movies;
DROP table teams;
SHOW tables;
SELECT * FROM teams;
SELECT * FROM SequelizeMeta;
DELETE FROM SequelizeMeta;

CREATE USER 'movies'@'localhost' IDENTIFIED WITH mysql_native_password BY '#######';

GRANT ALL ON movies.* TO 'movies'@'localhost';
