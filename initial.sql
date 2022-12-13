DROP TABLE IF EXISTS signatures;

CREATE TABLE signatures (
    id SERIAL primary key,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    signature VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
); 
/*DROP TABLE IF EXISTS users;/*


/*CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/