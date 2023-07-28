const { EmbedBuilder } = require("@discordjs/builders")
const get_gif = require('../helpers/get_gif.js')

module.exports = {
    name: 'wired',
	desc: 'sends a random lain gif.',
    execute(msg) {    
        let { gif, index } = get_gif.execute(msg, 'lain', this.name)
        let embed = new EmbedBuilder()
            .setTitle(`${this.name} #${index}`)
            .setImage(gif);
        msg.channel.send({embeds: [embed]})
    }
}
