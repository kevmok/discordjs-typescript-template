import { ChannelType, GuildMember, Message } from 'discord.js';
import { BotEvent } from '@typings/index';
import { checkPermissions, sendTimedMessage } from '@utils/functions';
import { db } from '@db/index';
import { SelectPrefixSchema, generic } from '@db/schema/generic';
import { eq } from 'drizzle-orm';

const event: BotEvent = {
  name: 'messageCreate',
  execute: async (message: Message) => {
    if (!message.guild || message.author.bot) return;

    const prefix = await getPrefix();
    if (
      !message.content.startsWith(prefix) ||
      message.channel.type !== ChannelType.GuildText
    )
      return;

    const [commandName, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find((cmd) => cmd.aliases.includes(commandName));
    if (!command) return;

    const cooldownKey = `${command.name}-${message.author.id}`;
    const cooldown = message.client.cooldowns.get(cooldownKey) ?? 0;
    const neededPermissions = checkPermissions(
      message.member as GuildMember,
      command.permissions,
    );
    if (neededPermissions) {
      return sendTimedMessage(
        `You don't have enough permissions to use this command.`,
        message.channel,
        5000,
      );
    } else if (cooldown > Date.now()) {
      const remainingCooldown = Math.ceil((cooldown - Date.now()) / 1000);
      return sendTimedMessage(
        `Please wait ${remainingCooldown} second(s) before reusing the \`${command.name}\` command.`,
        message.channel,
        5000,
      );
    }

    message.client.cooldowns.set(
      cooldownKey,
      Date.now() + command.cooldown * 1000,
    );
    setTimeout(
      () => message.client.cooldowns.delete(cooldownKey),
      command.cooldown * 1000,
    );

    try {
      await command.execute(message, args);
    } catch (error) {
      console.error(error);
      return sendTimedMessage(
        `An error occurred while executing the \`${command.name}\` command.`,
        message.channel,
        5000,
      );
    }
  },
};

async function getPrefix(): Promise<string> {
  const result = SelectPrefixSchema.safeParse({ key: 'prefix' });
  if (result.success) {
    const [genericRecord] = await db
      .select()
      .from(generic)
      .where(eq(generic.key, 'prefix'));
    return genericRecord.value;
  }
  return '.';
}

export default event;
