import { BotEvent, SlashCommand } from '@typings/index';
import { ChatInputCommandInteraction, Interaction } from 'discord.js';

const event: BotEvent = {
  name: 'interactionCreate',
  execute: async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = getCommand(interaction);
    if (!command) return;

    if (command.cooldown) {
      const cooldownKey = `${interaction.commandName}-${interaction.user.id}`;
      const cooldown = interaction.client.cooldowns.get(cooldownKey) ?? 0;
      const remainingCooldown = Math.max(cooldown - Date.now(), 0);

      if (remainingCooldown > 0) {
        await interaction.deferReply({ ephemeral: true });
        await interaction.followUp(
          `You have to wait ${Math.ceil(
            remainingCooldown / 1000,
          )} second(s) to use this command again.`,
        );
        return;
      }

      interaction.client.cooldowns.set(
        cooldownKey,
        Date.now() + command.cooldown * 1000,
      );
      setTimeout(
        () => interaction.client.cooldowns.delete(cooldownKey),
        command.cooldown * 1000,
      );
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.followUp({
        content: 'An error occurred while executing this command.',
        ephemeral: true,
      });
    }
    // } finally {
    //   if (interaction.deferred || interaction.replied) {
    //     await interaction.deleteReply();
    //   }
    // }
  },
};

function getCommand(interaction: ChatInputCommandInteraction): SlashCommand {
  const command: SlashCommand = interaction.client.slashCommands.get(
    interaction.commandName,
  );
  if (!command) {
    interaction.followUp({
      content: 'This command does not exist.',
      ephemeral: true,
    });
  }
  return command;
}

export default event;
