const get_gif = require('../helpers/get_gif.js')

module.exports = {
    name: 'meow',
	desc: 'sends a random meowing kitty gif.',
    execute(msg) {    
        get_gif.execute(msg, 'kitty meowing', this.name)
    }
}
