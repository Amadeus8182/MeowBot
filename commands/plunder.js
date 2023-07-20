const check_user = require('../helpers/user-checker.js')
const update_points = require('../helpers/points-updater.js');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./users.db');

module.exports = {
	name: 'plunder',
	desc: 'earn meow meow points every 12 hours',
	execute(msg) {
		const rate = 2500;
		let id = msg.author.id;
		let username = msg.author.username;
		db.serialize(() => {
			check_user.execute(id, username);
			update_points.execute(id, rate);
		});
	}
}
