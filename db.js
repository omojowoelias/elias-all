require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env; // add a .env file next to the db.js file with your PostgreSQL credentials
const spicedPg = require("spiced-pg");
const db = spicedPg(
    `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/petition`
);

// Function to SELECT signatures
module.exports.getSignature = () => {
    return db.query(`SELECT * FROM signatures;`)
};

// Function to INSERT signatures
module.exports.addSignature = (firstName, lastName, signature) => {
   return db.query(
        `INSERT INTO signatures (firstname, lastname, signature) VALUES ($1, $2, $3) RETURNING * `,
        [firstName,
        lastName,
        signature]
    )
};


