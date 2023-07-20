const { EmbedBuilder } = require("@discordjs/builders")
const check_user = require('../helpers/check_user.js')
const get_user_info = require('../helpers/get_user_info.js')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./users.db');

module.exports = {
	name: 'user',
	desc: 'view information about your profile',
	async execute(msg) {

		const USERNAME = msg.author.username;
		const USER_ID = msg.author.id;
		let account_date, account_time = get_account_created(msg.author);

		await check_user.execute(USER_ID, USERNAME);

		let needed_info = ['points', 'plunder_next_used']
		let info = await get_user_info.execute(USER_ID, needed_info)

		let seconds_since_epoch = Math.floor(new Date() / 1000)
		let plunder_cooldown = new Date(info.plunder_next_used-seconds_since_epoch*1000).toISOString().substring(11,19);
		let display_info = [`Points: ${info.points}`,
							`Plunder: ${plunder_cooldown}`];

		let embed = new EmbedBuilder()
			.setColor(parseInt((Math.random()*0xFFFFFF<<0).toString(16), 16)) // random colors
			.setTitle(`${USERNAME} (${USER_ID})`)
			.setDescription(display_info.join('\n'))
			.setFooter({text: `Account created: ${account_date}, ${account_time} - UTC`,
						iconURL: msg.author.displayAvatarURL({dynamic: true})
			}); 

		msg.channel.send({embeds: [embed]});
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
