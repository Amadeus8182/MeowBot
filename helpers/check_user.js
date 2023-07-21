const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./users.db');

module.exports = {
	name:'check_user',
	execute(id, usr)  {
		return new Promise((resolve) => {
			db.run(`INSERT OR IGNORE INTO user_info(id, username) VALUES("${id}", "${usr}")`, (err) => {
				if(err) return console.log(err + ' ' + this.name)
				return resolve(`checked: ${id}, ${usr}`);
			});
		});
	}
}
