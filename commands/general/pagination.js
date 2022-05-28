const { Message, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed, Collector, SelectMenuInteraction } = require('discord.js');
module.exports = {
    data: {
        name: "pagination",
        description: "Demonstrates Pagination",
        Categorys: [],
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
            );
        
        const selectMenuRow = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('category_select_menu')
                    .addOptions([
                        {
                            label: 'Category 1',
                            description: 'Category 1 desc',
                            value: 'Category_1'
                        },
                        {
                            label: 'Category 2',
                            description: 'Category 2 desc',
                            value: 'Category_2'
                        },
                        {
                            label: 'Category 3',
                            description: 'Category 3 desc',
                            value: 'Category_3'
                        }
                    ]),

                );
        
        const category_1_e1 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 1')
                .setDescription('Page 1')
                
            
        const category_1_e2 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 1')
                .setDescription('Page 2')
                
            
        const category_1_e3 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 1')
                .setDescription('Page 3')
                

        const category_1_e4 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 1')
                .setDescription('Page 4')
                
        
        const category_1_e5 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 2')
                .setDescription('Page 5')


        const category_2_e1 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 2')
                .setDescription('Page 1')
                
            
        const category_2_e2 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 2')
                .setDescription('Page 2')
                
            
        const category_2_e3 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 2')
                .setDescription('Page 3')
                

        const category_2_e4 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 2')
                .setDescription('Page 4')
                
        
        const category_2_e5 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 2')
                .setDescription('Page 5')
        

        const category_3_e1 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 3')
                .setDescription('Page 1')
                
            
        const category_3_e2 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 3')
                .setDescription('Page 2')
                
            
        const category_3_e3 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 3')
                .setDescription('Page 3')
                

        const category_3_e4 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 3')
                .setDescription('Page 4')
                
        
        const category_3_e5 = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Category 3')
                .setDescription('Page 5')
        
                

        let embeds = [category_1_e1, category_1_e2, category_1_e3, category_1_e4, category_1_e5];


        await interaction.reply({
            embeds: [embeds[0]],
            components: [selectMenuRow, buttonRow]
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

            if (i.isSelectMenu()){
                if (i.customId === 'category_select_menu'){
                    if (i.values[0]){
                        embeds = [category_1_e1, category_1_e2, category_1_e3, category_1_e4, category_1_e5];
                        
                    }
                    if (i.values[1]){
                        embeds = [category_2_e1, category_2_e2, category_2_e3, category_2_e4, category_2_e5];
                        
                    }
                    if (i.values[2]){
                        embeds = [category_3_e1, category_3_e2, category_3_e3, category_3_e4, category_3_e5];
                        
                    }

                await i.update({
                    embeds: [embeds[0]],
                    components: [selectMenuRow, buttonRow]
                })

                }

            }

            if (i.customId === 'prev_page_button') {
                currentIndex === 0 ? currentIndex = embeds.length - 1 : currentIndex -= 1;
            }
            if (i.customId === 'next_page_button') {
                currentIndex === embeds.length - 1 ? currentIndex = 0 : currentIndex += 1;
                
            }

            await i.update({
                embeds: [embeds[currentIndex]],
                components: [selectMenuRow, buttonRow]
            })
            
        
        })

    }

}