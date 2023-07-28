const { EmbedBuilder } = require("@discordjs/builders")
const get_gif = require('../helpers/get_gif.js')

module.exports = {
    name: 'dance',
	desc: 'sends a random dancing kitty gif.',
    execute(msg) {    
        let { gif, index } = get_gif.execute(msg, 'kitty dance', this.name)
        let embed = new EmbedBuilder()
            .setTitle(`${this.name} #${index}`)
            .setImage(gif);
        msg.channel.send({embeds: [embed]})
    }
}
