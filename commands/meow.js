const { EmbedBuilder } = require("@discordjs/builders")
const get_gif = require('../helpers/get_gif.js')

module.exports = {
    name: 'meow',
	desc: 'sends a random meowing kitty gif.',
    execute(msg) {    
        let { gif, index } = get_gif.execute(msg, 'kitty meowing', this.name)
        let embed = new EmbedBuilder()
            .setTitle(`${this.name} #${index}`)
            .setImage(gif);
        msg.channel.send({embeds: [embed]})
    }
}
