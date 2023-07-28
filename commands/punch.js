const { EmbedBuilder } = require("@discordjs/builders")
const get_gif = require('../helpers/get_gif.js')

module.exports = {
    name: 'punch',
	desc: 'sends a random dancing kitty gif.',
    execute(msg) {    
        let { gif, index } = get_gif.execute(msg, 'cat punching cat', this.name)
        let embed = new EmbedBuilder()
            .setTitle(`${this.name} #${index}`)
            .setDescription(`<@${msg.author.id}> punches ${args[0]}`)
            .setImage(gif);
        msg.channel.send({embeds: [embed]})
    }
}
