const express = require('express');
const haxStatsRouter = express.Router();

const sqlite3 = require('sqlite3');
const DBSOURCE = '../haxbot/database.sqlite'
//process.env.TEST_DATABASE ||

let middleware = require('./checkTokenMid');

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database for Hax Stats.')
    }
});

/* haxStatsRouter.param('player_auth_key', (req, res, next, player_auth_key) => {
    const sql = 'SELECT * FROM HaxDB WHERE auth_key = $player_auth_key';
    const params = {$player_auth_key: player_auth_key};
    db.get(sql, params, (error, player) => {
      if (error) {
        next(error);
      } else if (player) {
        req.player = player;
        next();
      } else {
        res.sendStatus(404);
      }
    });
  }); */


  haxStatsRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM HaxDB',
        (err, rows) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            } else {
                res.json({
                    "message":"success",
                    "data":rows
                })
            }
        });
});

haxStatsRouter.post('/', (req, res, next) => {
  const sql = 'SELECT * FROM HaxDB WHERE auth_key = $player_auth_key';
  const params = {$player_auth_key: req.body.haxKey};
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      } else {
        res.status(200).json({
          "message":"success",
          "jucator": row
        });
      }
    });  
  });

module.exports = haxStatsRouter;