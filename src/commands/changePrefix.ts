// import { setGuildOption } from '../functions';
import { Command } from '@typings/index';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { generic, updatePrefixSchema } from '@db/schema/generic';

const command: Command = {
  name: 'changePrefix',
  execute: async (message, args) => {
    const prefix = args[1];
    if (!prefix) {
      message.channel.send('No prefix provided');
      return;
    }
    if (!message.guild) return;

    const result = updatePrefixSchema.safeParse({ prefix });
    if (!result.success) {
      message.channel.send('Invalid prefix provided');
      return;
    }

    try {
      await db
        .update(generic)
        .set({ key: result.data.value })
        .where(eq(generic.key, 'prefix'));
      message.channel.send('Prefix successfully changed!');
    } catch (error) {
      message.channel.send('An error occurred while changing the prefix');
      console.log(error);
    }
  },
  permissions: ['Administrator'],
  aliases: [],
};

export default command;
