const get_gif = require('../helpers/get_gif.js')

module.exports = {
    name: 'dance',
	desc: 'sends a random dancing kitty gif.',
    execute(msg) {    
        get_gif.execute(msg, 'kitty dance', this.name)
    }
}
