const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./users.db');

module.exports = {
	name:'check_user',
	async execute(id, usr) {
		db.run(`INSERT OR IGNORE INTO user_info(id, username) VALUES("${id}", "${usr}")`, (err) => {
			if(err) return console.log(err + ' ' + this.name)
		});
	}
}
