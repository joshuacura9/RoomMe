let sqlite3 = require('sqlite3');
let database = new sqlite3.Database('./database.db');

const createTablePostingQuery = "CREATE TABLE IF NOT EXISTS listings (name TEXT, apt_location TEXT, price TEXT, roommates_needed TEXT, apt_details TEXT)";
const createTableUserQuery = "CREATE TABLE IF NOT EXISTS user (username TEXT UNIQUE, email TEXT UNIQUE, password TEXT)";

database.run(createTablePostingQuery, error => {
    if (error) {
        console.log("Create posting table failed", error);
    }
    else {
        console.log("Create posting table succeeded");
    }
});
database.run(createTableUserQuery, error => {
    if (error) {
        console.log("Create Users table failed", error);
    }
    else {
        console.log("Create Users table succeeded");
    }
});

module.exports = database;