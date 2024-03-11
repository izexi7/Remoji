const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get information about Remoji'),
    run: async (client, interaction) => {
        try {
            // Create a simple embed
            const embed = new EmbedBuilder()
                .setColor('#7289da')
                .setTitle('About Remoji')
                .setDescription('Remoji is a simple but powerful bot that lets you steal, upload and download emotes.')
                .setFooter({ text: 'Made with JavaScript and ❤️ by izexi7' })
                .setThumbnail('https://raw.githubusercontent.com/remoji-bot/remoji.gg/cbfb949246a9b9032ea90d3d4e4c14b09383dca0/src/public/images/Remoji-Logo.png');

            // Create buttons
            const joinButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel('Join the Discord')
                .setEmoji('💬')
                .setURL('https://discord.gg/');

            const addButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel('Add to Your Server')
                .setEmoji('📩')
                .setURL('https://discord.com');

            const voteButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel('Vote on Top.gg')
                .setEmoji('🗳️')
                .setURL('https://top.gg');


            // Create action row to hold the buttons
            const actionRow = new ActionRowBuilder()
                .addComponents(joinButton, addButton, voteButton);

            // Reply with the embed and buttons
            return interaction.reply({ embeds: [embed], components: [actionRow] });
        } catch (error) {
            console.error('Error displaying server information:', error);
            interaction.reply('An error occurred while displaying server information.');
        }
    },
};
