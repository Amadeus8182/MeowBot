const get_gif = require('../helpers/gif-getter')

module.exports = {
    name: 'wired',
	desc: 'sends a random lain gif.',
    execute(msg) {    
        get_gif.execute(msg, 'lain', this.name)
    }
}
