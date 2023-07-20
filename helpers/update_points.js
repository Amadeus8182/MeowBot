const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./users.db');

module.exports = {
	name:'update_points',
	execute(id, rate) {
		db.run(`UPDATE user_info SET points = points + ${rate} WHERE id = ${id}`, (err) => {
			if(err) return console.log(err + ' ' + this.name);
		});
	}
}
