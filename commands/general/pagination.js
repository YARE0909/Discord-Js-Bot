const { Message, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed, Collector } = require('discord.js');
module.exports = {
    data: {
        name: "pagination",
        description: "Demonstrates Pagination",
        options: [],
    },
    timeout:60000,
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const buttonRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('prev_page_button')
                    .setLabel('⏮')
                    .setStyle('PRIMARY'),
                
                new MessageButton()
                    .setCustomId('next_page_button')
                    .setLabel('⏭')
                    .setStyle('PRIMARY')
            )
        
        const page_1_embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Page 1')
                
            
        const page_2_embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Page 2')
                
            
        const page_3_embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Page 3')
                

        const page_4_embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Page 4')
                
        
        const page_5_embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Page 5')
                

        const embeds = [page_1_embed, page_2_embed, page_3_embed, page_4_embed, page_5_embed]

        let page = 1;

        await interaction.reply({
            embeds: [embeds[0]],
            components: [buttonRow]
        })


        const collector = await interaction.channel.createMessageComponentCollector({
            time: 60000
        })
        let currentIndex = 0
        collector.on("collect", async i => {
            
            if (interaction.user.id !== i.user.id) return await i.reply({
                content: 'You are not the author',
                ephemeral: true
            })

            if (i.customId === 'prev_page_button') {
                currentIndex === 0 ? currentIndex = embeds.length - 1 : currentIndex -= 1;
            }
            if (i.customId === 'next_page_button') {
                currentIndex === embeds.length - 1 ? currentIndex = 0 : currentIndex += 1;
                
            }

            await i.update({
                embeds: [embeds[currentIndex]],
                components: [buttonRow]
            })
            
        
        })

    }

}