const { EmbedBuilder } = require("@discordjs/builders")
const get_gif = require('../helpers/get_gif.js')

module.exports = {
    name: 'gamba',
	desc: 'sends a random gif from the anime Kakegurui.',
    execute(msg) {    
        let { gif, index } = get_gif.execute(msg, 'kakegurui', this.name)
        let embed = new EmbedBuilder()
            .setTitle(`${this.name} #${index}`)
            .setImage(gif);
        msg.channel.send({embeds: [embed]})
    }
}
