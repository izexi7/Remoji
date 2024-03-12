const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show')
    .setDescription('Show and download an emoji from Discord')
    .addStringOption(option =>
      option.setName('emoji')
        .setDescription('The emoji to show')
        .setRequired(true)),
        async execute(interaction) {
          try {
      let emojiInput = interaction.options.getString('emoji');

      // Check if the emoji is a custom emoji
      const emoji = interaction.client.emojis.cache.find(e => e.name === emojiInput);

      // Check if the emoji is a Unicode emoji
      const unicodeEmojiRegex = /[\p{Emoji_Modifier_Base}\p{Emoji_Presentation}\p{Emoji}\p{Emoji_Component}]/u;
      const isUnicodeEmoji = unicodeEmojiRegex.test(emojiInput);

      let emojiInfo;
      if (emoji) {
        emojiInfo = {
          name: emoji.name, 
          id: emoji.id,
          animated: emoji.animated,
          url: emoji.url
        };
      } else if (isUnicodeEmoji) {
        // If it's a Unicode emoji, return an error
        const errorEmbed = new EmbedBuilder()
          .setColor('#dd2e44')
          .setTitle(':x: Invalid emoji!')
          .setDescription('Please provide the name of a custom emoji in your server without `::`');
        return interaction.reply({ embeds: [errorEmbed],  ephemeral: true});
      } else {
        return interaction.reply({ content: ':x: Invalid emoji!',  ephemeral: true});
      }

      const embed = new EmbedBuilder()
        .setColor('#7289da')
        .setTitle('Show Emoji')
        .setImage(emojiInfo.url)
        .setFooter({ text: 'Made with JavaScript and ❤️ by izexi7' })
        .addFields(
          { name: 'Name', value: emojiInput, inline: true},
          { name: 'Animated', value: emojiInfo.animated ? 'true' : 'false', inline: true },
          { name: 'ID', value: emojiInfo.id || 'Include `emojiname` not `:emojiname:` to get ID', inline: true },
          { name: 'URL', value: emojiInfo.url || 'Include `emojiname` not `:emojiname:` to get URL'}
        );

      const linkButton = new ButtonBuilder()
        .setLabel('Download')
        .setURL(emojiInfo.url)
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder()
        .addComponents(linkButton);

      return interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error('Error fetching emoji info:', error);
    //  interaction.reply('An error occurred while fetching emoji info.');
    }
  },
};