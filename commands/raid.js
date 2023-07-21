const check_user = require('../helpers/check_user.js')
const update_points = require('../helpers/update_points.js');
const update_cooldown = require('../helpers/update_cooldown.js');
const get_user_info = require('../helpers/get_user_info.js');

module.exports = {
	name: 'raid',
	desc: 'earn meow meow points every six hours',
	async execute(msg) {
		const POINTS_GIVEN = 10000 + Math.floor(Math.random()*2000);
		const COOLDOWN = 6*3600;	// cooldown has to be written in seconds
		const USER_ID = msg.author.id;
		const USERNAME = msg.author.username;

		await check_user.execute(USER_ID, USERNAME)
		let info = await get_user_info.execute(USER_ID, ['raid_next_used'])

		let seconds_since_epoch = Math.floor(new Date() / 1000);

		if(info.raid_next_used <= seconds_since_epoch) {
			update_points.execute(USER_ID, POINTS_GIVEN);
			update_cooldown.execute(USER_ID, this.name, COOLDOWN);
			msg.channel.send(`You raided ${POINTS_GIVEN} points!`);
		} else {
			msg.channel.send(`This command is on cooldown!`);
		}
	}
}
