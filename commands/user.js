const { EmbedBuilder } = require("@discordjs/builders")
const check_user = require('../helpers/user-checker.js')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./users.db');

module.exports = {
	name: 'user',
	desc: 'view information about your profile',
	async execute(msg) {

		let username = msg.author.username;
		let user_id = msg.author.id;
		let account_date, account_time = get_account_created(msg.author);

		check_user.execute(user_id, username).then(() => {
			db.get(`SELECT * FROM user_info WHERE id = ${user_id}`, (err, info) => {
				if(err) return console.log(err);

				let display_info = `Meow Meow Points: ${info.points}\nPlunder: ${info.plunder_last_used}`;
				let embed = new EmbedBuilder()
					.setColor(parseInt((Math.random()*0xFFFFFF<<0).toString(16), 16))
					.setTitle(`${username} - ${user_id}`)
					.setDescription(display_info)
					.setFooter({text: `Account created: ${account_date}, ${account_time} - UTC`,
								iconURL: msg.author.displayAvatarURL({dynamic: true})
					}); 

				msg.channel.send({embeds: [embed]});
			});
		});
	}
}

function get_account_created(msg_author) {
	let account_created = msg_author.createdAt;

	let account_year = account_created.getUTCFullYear();
	let account_month = account_created.getUTCMonth().toString().padStart(2, '0');
	let account_day = account_created.getUTCDate().toString().padStart(2, '0');
	let account_date = `${account_month}/${account_day}/${account_year}`;

	let account_hours = account_created.getUTCHours().toString().padStart(2, '0');
	let account_minutes = account_created.getUTCMinutes().toString().padStart(2, '0');
	let account_seconds = account_created.getUTCSeconds().toString().padStart(2, '0');
	let account_time = `${account_hours}:${account_minutes}:${account_seconds}`;

	return account_date, account_time;
}
