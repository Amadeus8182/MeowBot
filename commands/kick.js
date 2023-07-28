const { EmbedBuilder } = require("@discordjs/builders")
const get_gif = require('../helpers/get_gif.js')

module.exports = {
    name: 'kick',
	desc: 'sends a random dancing kitty gif.',
    execute(msg, args) {    
        let { gif, index } = get_gif.execute(msg, 'cat kicking cat', this.name)
        let embed = new EmbedBuilder()
            .setTitle(`${this.name} #${index}`)
            .setDescription(`<@${msg.author.id}> kicks ${args[0]}`)
            .setImage(gif);
        msg.channel.send({embeds: [embed]})
    }
}
