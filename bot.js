// Silly Intro
console.log('Bot is Starting... Meow Meow...\n\n');
console.log(
`             *     ,MMM8&&&.            *
                  MMMM88&&&&&    .
                 MMMM88&&&&&&&
     *           MMM88&&&&&&&&
                 MMM88&&&&&&&&
                 'MMM88&&&&&&'
                   'MMM8&&&'      *    
           /\\/|_      __/\\\\
          /    -\\    /-   ~\\  .              '
          \\    = Y =T_ =   /
           )==*(\`     \`) ~ \\
          /     \\     /     \\
          |     |     ) ~   (
         /       \\   /     ~ \\
         \\       /   \\~     ~/
  jgs_/\\_/\\__  _/_/\\_/\\__~__/_/\\_/\\_/\\_/\\_/\\_
  |  |  |  | ) ) |  |  | ((  |  |  |  |  |  |
  |  |  |  |( (  |  |  |  \\\\ |  |  |  |  |  |
  |  |  |  | )_) |  |  |  |))|  |  |  |  |  |
  |  |  |  |  |  |  |  |  (/ |  |  |  |  |  |
  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |\n\n`);


/*=========================================================*/
// DATABASE STUFF
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./users.db');

// during every startup of bot, check if table already exists
db.prepare(`CREATE TABLE IF NOT EXISTS 
	user_info(
		id TEXT,
		username TEXT,
		points BIGINT UNSIGNED DEFAULT 0,
		plunder_next_used BIGINT UNSIGNED DEFAULT 0,
		UNIQUE(id)
	)`, (err) => {if(err) return console.log(err)}
).run().finalize();

/*=========================================================*/
// MAIN STUFF
require('dotenv').config();
const fs = require('fs');
const {Client, GatewayIntentBits, Collection, Partials, EmbedBuilder} = require('discord.js');

client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageTyping
	],

	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.Reaction
	],
});

client.commands = new Collection();
client.login(process.env.TOKEN);



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

module.exports.cmds = client.commands;

client.on('ready', bootUp);
client.on('messageCreate', commands);

function bootUp() {
	client.user.setActivity('Use m.help!');
	console.log('Bot Started. Meow.');
}


const prefix = 'm.'

function commands(msg) {
	if(msg.content.toLowerCase().startsWith(prefix) && !msg.author.bot) {
		const args = msg.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();

		if(client.commands.has(command)) {
			try {
				client.commands.get(command).execute(msg, args);
			} catch(error) {
				console.log(error)
				msg.channel.send('Something unexpected happened.');
			}
		}

	}
}

