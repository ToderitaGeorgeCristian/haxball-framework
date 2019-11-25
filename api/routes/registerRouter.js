const express = require('express');
const registerRouter = express.Router();

const sqlite3 = require('sqlite3');
const DBSOURCE = '../haxbot/database.sqlite'
//process.env.TEST_DATABASE ||

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database for Register.')
    }
});

module.exports = registerRouter;