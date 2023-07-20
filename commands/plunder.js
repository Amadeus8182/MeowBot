const check_user = require('../helpers/check_user.js')
const update_points = require('../helpers/update_points.js');
const update_cooldown = require('../helpers/update_cooldown.js');
const get_user_info = require('../helpers/get_user_info.js');

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
