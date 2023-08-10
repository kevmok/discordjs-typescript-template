import { Client } from 'discord.js';
import { BotEvent } from '@typings/index';
import { color } from '@utils/functions';

const event: BotEvent = {
  name: 'ready',
  once: true,
  execute: (client: Client) => {
    console.log(
      color('text', `💪 Logged in as ${color('variable', client.user?.tag)}`),
    );
  },
};

export default event;
