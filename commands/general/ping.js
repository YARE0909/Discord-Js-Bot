let Discord = require('discord.js')
module.exports = {
    data: {
        name: "ping",
        description: "Get this bot's ping!",
        options: [],
    },
    timeout:10000,
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.reply({
            embeds: [
                {
                    title: 'Ping!',
                    description: `Latency is ${client.ws.ping}ms`,
                    color: '696969'
                }
            ],
            ephemeral: true
        })
    }
}