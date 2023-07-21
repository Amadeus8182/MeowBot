const { EmbedBuilder } = require("@discordjs/builders")
module.exports = {
    name: 'invite',
	desc: 'sends an invite link for the bot to be able to join other servers.',
    execute(msg) {
		let embed = new EmbedBuilder()
			.setTitle('Invite Meowbot')
			.setDescription('You can invite MeowBot to your own server using this [link](https://discord.com/oauth2/authorize?client_id=1066857245675102360&scope=bot&permissions=8)!');
        msg.channel.send({embeds: [embed]});
    }

}
