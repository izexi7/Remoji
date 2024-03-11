const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping pong!'),
    run: async (client, interaction) => {
        try {
            // Reply with "Pong!"
            return interaction.reply('Pong!');
        } catch (error) {
            console.error('Error processing ping command:', error);
            interaction.reply('An error occurred while processing the ping command.');
        }
    },
};
