const { EmbedBuilder } = require("@discordjs/builders")

module.exports = {
    name:'get_gif',
    async execute(msg, search, name) {
        url = `https://g.tenor.com/v2/search?q=${search}&key=${process.env.TENORKEY}&limit=50`;
        response = await fetch(url);
        let json = await response.json();

        const index = Math.floor((Math.random() * json.results.length))
        let embed = new EmbedBuilder()
            .setTitle(`${name} #${index+1}`)
            .setImage(json.results[index].media_formats.gif.url)

        msg.channel.send({embeds: [embed]})
    }
}
