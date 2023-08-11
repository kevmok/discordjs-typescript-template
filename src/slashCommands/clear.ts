import {
  ChannelType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';

import { SlashCommand } from '@typings/index';

const ClearCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delets messages from the current channel.')
    .addIntegerOption((option) => {
      return option
        .setMaxValue(100)
        .setMinValue(1)
        .setName('messagecount')
        .setDescription('Message amount to be cleared');
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  execute: async (interaction: ChatInputCommandInteraction) => {
    interaction.deferReply({ ephemeral: true });

    const messageCount = interaction.options.getInteger('messagecount');
    if (!interaction.channel || interaction.channel.type === ChannelType.DM)
      return;
    const messages = await interaction.channel.messages.fetch({
      limit: messageCount as number,
    });
    if (messages.size === 0) {
      interaction.deferReply({ ephemeral: true });
      interaction.followUp('No messages were deleted.');
      return;
    }
    const deletedMessages = await interaction.channel.bulkDelete(
      messages,
      true,
    );
    await interaction.followUp({
      content: `Successfully deleted ${deletedMessages.size} message(s)`,
      ephemeral: true,
    });
    setTimeout(async () => await interaction.deleteReply(), 5000);
  },
  cooldown: 10,
};

export default ClearCommand;
