const get_gif = require('../helpers/gif-getter')

module.exports = {
    name: 'gamba',
	desc: 'sends a random gif from the anime Kakegurui.',
    execute(msg) {    
        get_gif.execute(msg, 'kakegurui', this.name)
    }
}
