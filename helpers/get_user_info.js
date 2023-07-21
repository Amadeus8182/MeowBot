const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./users.db');

module.exports = {
	name:'get_user_info',
	execute(id, columns_) {
		let columns = columns_.join(', ');
		return new Promise((resolve) => {
			db.get(`SELECT ${columns} FROM user_info WHERE id = ${id}`, (err, info) => {
				if(err) return console.log(err);
				return resolve(info);
			});
		});
	}
}
