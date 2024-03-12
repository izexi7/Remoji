const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping pong!'),
        async execute(interaction) {
            try {
            return interaction.reply('Pong!');
        } catch (error) {
            console.error('Error processing ping command:', error);
            interaction.reply('An error occurred while processing the ping command.');
        }
    },
};
