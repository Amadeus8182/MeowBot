const get_gif = require('../helpers/get_gif.js')

module.exports = {
    name: 'wired',
	desc: 'sends a random lain gif.',
    execute(msg) {    
        get_gif.execute(msg, 'lain', this.name)
    }
}
