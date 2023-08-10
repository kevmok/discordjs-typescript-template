import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import { getThemeColor } from '@utils/functions';
import { SlashCommand } from '@typings/index';

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Shows the bot's ping"),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: 'MRC License' })
          .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`)
          .setColor(getThemeColor('text')),
      ],
    });
  },
  cooldown: 10,
};

export default command;
