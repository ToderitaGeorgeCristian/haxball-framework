const express = require('express');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');

const sqlite3 = require('sqlite3');
const DBSOURCE = '../haxbot/database.sqlite'
//process.env.TEST_DATABASE ||



const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database for Login.')
    }
});

loginRouter.post('/', (req, res, next) => {
    //console.log(req.query);
    //console.log(req.body);
    //console.log(req.params);
    //res.send(req.body);
    let username = req.body.username;
    let password = req.body.password;
    //console.log(req.body.username);
    //console.log(req.body.password);
    if (username && password) {
        let sql = 'SELECT * FROM WebUsers WHERE Username = $username AND Password = $password';
        const params = {
            $username: username,
            $password: password
        };
        db.get(sql, params, function (err, row) {
            if (err || row === undefined) {
                res.status(401).json({
                    success: false,
                    message: 'Incorrect username / password'
                });
            } else {
                let token = jwt.sign({ username: username },
                    'cheieSecretaDeMutatDOTENV',
                    { expiresIn: 60 * 30 });
                res.json({
                    success: true,
                    message: "Auth successfully",
                    token: token,
                    user: row.Username,
                    haxAuthKey: row.HaxAuthKey
                });
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid or empty username / password'
        });
    }
});


loginRouter.post('/jwtCheck', (req, res, next) => {
    let username = req.body.username;
    let token = req.body.token;

    /* if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    } */
    

    if (token) {
        jwt.verify(token, 'cheieSecretaDeMutatDOTENV', (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err.message
                });
            } else {
                let hax_auth_key = null;
                let sql = `SELECT * FROM WebUsers WHERE Username = $username`;
                const params = {
                    $username: username
                };
                db.get(sql, params, function (err, row) {
                    if (err || row === undefined) {
                        res.status(401).json({
                            success: false,
                            message: 'decoded.username NOT in DB WebUsers'
                        });
                    }
                    /* else {
                        //This is useless
                        hax_auth_key = row.HaxAuthKey
                    } */

                    return res.json({
                        success: true,
                        message: "Token and Username are valid",
                        user: row.Username,
                        haxAuthKey: row.HaxAuthKey
                    });
                });
            }
        })
    }
});

module.exports = loginRouter;