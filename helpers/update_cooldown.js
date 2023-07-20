const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./users.db');

module.exports = {
	name: 'update_cooldown',
	execute(id, command, cooldown) {
		let seconds_since_epoch = Math.floor(new Date() / 1000)
		db.run(`UPDATE user_info SET ${command}_next_used = ${seconds_since_epoch+cooldown} WHERE id = ${id}`, (err) => {
			if(err) return console.log(err + ' ' + this.name);
		});
	}
}

