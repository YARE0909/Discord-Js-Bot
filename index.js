const Discord = require('discord.js');
const config = require('./config.json')
const { readdirSync } = require('fs');
const { join } = require('path');

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
    partials: ["REACTION", "MESSAGE"]
});

client.timeouts = new Discord.Collection();
client.commands = new Discord.Collection();
client.categories = readdirSync(join(__dirname, "./commands"));
client.owners = ["784315703733387264"];

readdirSync(join(__dirname, "./events")).forEach(file =>
    client.on(file.split(".")[0], (...args) => require(`./events/${file}`)(client, ...args))
);

for (let i = 0; i < client.categories.length; i++) {
    const commands = readdirSync(join(__dirname, `./commands/${client.categories[i]}`)).filter(file => file.endsWith(".js"));

    for (let j = 0; j < commands.length; j++) {
        const command = require(`./commands/${client.categories[i]}/${commands[j]}`);
        if (!command || !command?.data?.name || typeof (command?.run) !== "function") continue;
        command.category = client.categories[i];
        client.commands.set(command.data.name, command);
    }
}

client.login(config.token);