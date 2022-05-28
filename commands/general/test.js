const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
module.exports = {
    data: {
        name: "test",
        description: "Test for verious things",
        options: [],
    },
    timeout:10000,
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Select Something')
                    .addOptions([
                        {
                            label: 'Option 1',
                            description: 'Option 1 desc',
                            value: 'option_1'
                        },
                        {
                            label: 'Option 2',
                            description: 'Option 2 desc',
                            value: 'option_2'
                        },
                        {
                            label: 'Option 3',
                            description: 'Option 3 desc',
                            value: 'option_3'
                        },
                        {
                            label: 'Option 4',
                            description: 'Option 4 desc',
                            value: 'option_4'
                        },
                    ]),    
            );

        const row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('button1')
                    .setLabel('Click')
                    .setStyle('SECONDARY'),

                new MessageButton()
                    .setCustomId('button2')
                    .setLabel('Click')
                    .setStyle('PRIMARY')
            )


        await interaction.reply({
            embeds: [
                {
                    title: 'Select Menu',
                    color: '696969'
                }
            ],
            components: [row, row1]
        })

        const collector = await interaction.channel.createMessageComponentCollector({
            time: 60000
        })
          
        collector.on("collect", async i => {
            if (interaction.user.id !== i.user.id) return await i.reply({
                content: 'You are not the author',
                ephemeral: true
            })
            if (i.isSelectMenu()) {
                if (i.customId === 'select') {
                    await i.reply({ 
                        content: 'Something was selected!' });
                }
            } else if (i.isButton()) {
                if (i.customId.toLowerCase() === 'button1') {
                    await i.reply({ content: 'Shit works' })
                }
                if (i.customId.toLowerCase() === 'button2') {
                    await i.reply({
                        content: "2nd button was selected"
                    })
                }
            }
        })

        collector.on('end', async (_) => {
            console.log('Interaction ended')
        })

    
    }
}