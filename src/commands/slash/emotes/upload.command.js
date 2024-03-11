const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
 
module.exports = {
    structure: new SlashCommandBuilder()
        .setName('upload')
        .setDescription('Upload an emoji by ID or image URL')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuildExpressions)
        .addStringOption(option => option.setName('id-or-url').setDescription('Emoji ID or image URL').setRequired(true))
        .addStringOption(option => option.setName('name').setDescription('Emoji name (2-32 characters, alphanumeric and underscores only)').setRequired(true).setMinLength(2)),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
  
        let emoji = interaction.options.getString('id-or-url')?.trim();
        const name = interaction.options.getString('name');

        // Check if emoji is empty or null
        if (!emoji) {
            return await interaction.reply({ content: ":x: Invalid emoji.", ephemeral: true});
        }
 
        if (emoji.startsWith("<") && emoji.endsWith(">")) {
            const id = emoji.match(/\d{15,}/g)[0];
 
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
                .then(image => {
                    if (image) return "gif";
                    else return "png";
                }).catch(err => {
                    return "png";
                });
 
            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`;
        }
 
        if (!emoji.startsWith("http")) {
            return await interaction.reply({ content: "You cannot upload default emojis.", ephemeral: true});
        }
 
        if (!emoji.startsWith("https")) {
            return await interaction.reply({ content: "You cannot upload default emojis.", ephemeral: true});
        }
 
        interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}`})
            .then(emoji => {
                interaction.reply(`:white_check_mark: Uploaded emoji: ${emoji}`);
            })
            //.catch(err => {
           //     interaction.reply({ content: "You cannot upload this emoji because you have reached your server emoji limit", ephemeral: true});
           // });
    }
};
