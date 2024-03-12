const { default: axios } = require('axios');
const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('copy')
        .setDescription('Copy one (or multiple) emote(s) to this server')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuildExpressions)
        .addStringOption(option => option.setName('emoji').setDescription('The emoji to copy').setRequired(true)),
        
        async execute(interaction) {
        let emoji = interaction.options.getString('emoji')?.trim();

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

        // Generate a random name for the emoji
        const name = generateRandomName();

        interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}`})
            .then(emoji => {
                interaction.reply(`:white_check_mark: Uploaded emoji: ${emoji}`);
            })
            //.catch(err => {
           //     interaction.reply({ content: "You cannot upload this emoji because you have reached your server emoji limit", ephemeral: true});
           // });
    }
};

// Function to generate a random name for the emoji
function generateRandomName() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789erthklqedtgnbklqentghkl3etr3kpg1j3KkJkJHJKHhjkGJHgjHGjhgJGHFuVBnnJKMNjkTYdtyRTweTYGJmLpklhHUfhuimletmhkl2465mykopetbkldtmhkl456yklod';
    let name = 'remoji_';
    for (let i = 0; i < 8; i++) {
        name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return name;
}
