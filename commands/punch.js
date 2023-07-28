const get_gif = require('../helpers/get_gif.js')

module.exports = {
    name: 'punch',
	desc: 'sends a random dancing kitty gif.',
    execute(msg) {    
        get_gif.execute(msg, 'cat punching cat', this.name)
    }
}
