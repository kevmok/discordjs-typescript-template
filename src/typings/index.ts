import {
  SlashCommandBuilder,
  PermissionResolvable,
  Message,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
} from 'discord.js';

export interface SlashCommand {
  command: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void> | void;
  cooldown?: number; // in seconds
}

export interface Command {
  name: string;
  execute: (message: Message, args: Array<string>) => Promise<void> | void;
  permissions: Array<PermissionResolvable>;
  aliases: Array<string>;
  cooldown?: number;
}

export interface BotEvent {
  name: string;
  once?: boolean | false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => void;
}
