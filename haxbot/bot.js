
let dbPlayers = {
	'8999' : {
		id: 8999,
		name: 'haxhost',
		role: 'special', 
		mute: false,
		tempBan: false,
		permBan: false,
		Goals:0,
		Assist:0,
		GamesPlayed:0,
	},
	'8998' : {
		id: 8998,
		name: 'haxhost98',
		role: 'player', 
		mute: false,
		tempBan: true,
		permBan: false,
		Goals:0,
		Assist:0,
		GamesPlayed:0
	},
	'8997' : {
		id: 8997,
		name: 'haxhost97',
		role: 'admin', 
		mute: false,
		tempBan: false,
		permBan: false,
		Goals:0,
		Assist:0,
		GamesPlayed:0
	},
	'8996' : {
		id: 8996,
		name: 'haxhost96',
		role: 'player', 
		mute: false,
		tempBan: false,
		permBan: false,
		Goals:0,
		Assist:0,
		GamesPlayed:0
	}
};

//console.log("Hard coded initial DB : " + Object.keys(dbPlayers))

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');
const sql = 'CREATE TABLE IF NOT EXISTS `HaxDB` ( ' +
           '`auth_key` TEXT NOT NULL, ' +
           '`name` TEXT NOT NULL, ' +
		   '`player_id` INTEGER NOT NULL, ' +
		   '`role` TEXT NOT NULL, ' +
		   '`mute` Boolean NOT NULL, ' +
           '`tempBan` Boolean NOT NULL, ' +
		   '`permBan` Boolean NOT NULL, ' +
		   '`Goals` INTEGER NOT NULL, ' +
		   '`Assist` INTEGER NOT NULL, ' +
		   '`GamesPlayed` INTEGER NOT NULL, ' +
           'PRIMARY KEY(`auth_key`) )'
const values = []

db.run(sql, values, (error) => {
    if (error) {
      console.log(error);
    } else {
		console.log("Table HaDB created OR already exists !");
	}
});

function insertDB() {
	
	for (let [key, value] of Object.entries(dbPlayers)) {
		//console.log(`${key}: ${value}`);
		let params = []
		for (let [key2, value2] of Object.entries(value)) {
			params.push(value2);
		}
		//console.log(params)
		const sql =`INSERT OR REPLACE INTO HaxDB (auth_key, player_id, name, role, mute, tempBan, permBan, Goals, Assist, GamesPlayed)
		VALUES (${key}, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		db.run(sql, params)
	}
	
}

insertDB();

db.close();

/* '8999' : {
		id: 8999,
		name: 'haxhost',
		role: 'special', 
		mute: false,
		tempBan: false,
		permBan: false,
		Goals:0,
		Assist:0,
		GamesPlayed:0,
	}, */


//console.log('test')

/* 
const puppeteer = require('puppeteer');
async function bot () {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://www.haxball.com/headless', {waitUntil: 'networkidle2'});
    await page.addScriptTag({path: '1.Drtoothy v6.txt'});
}
bot();
console.log('Bot loaded');
*/