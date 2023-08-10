import chalk from 'chalk';
import {
  GuildMember,
  PermissionFlagsBits,
  PermissionResolvable,
  TextChannel,
} from 'discord.js';

type colorType = 'text' | 'variable' | 'error';

const themeColors = {
  text: '#ff8e4d',
  variable: '#ff624d',
  error: '#f5426c',
};

export const getThemeColor = (color: colorType) =>
  Number(`0x${themeColors[color].substring(1)}`);

export const color = (color: colorType, message: unknown) => {
  return chalk.hex(themeColors[color])(message);
};

const getMissingPermissions = (
  member: GuildMember,
  permissions: Array<PermissionResolvable>,
) => {
  const missingPermissions: PermissionResolvable[] = [];
  permissions.forEach((permission) => {
    if (!member.permissions.has(permission))
      missingPermissions.push(permission);
  });
  return missingPermissions;
};

const formatPermissionName = (permission: PermissionResolvable) => {
  if (typeof permission === 'string') {
    return permission.split(/(?=[A-Z])/).join(' ');
  } else {
    return Object.keys(PermissionFlagsBits)
      .find((k) => Object(PermissionFlagsBits)[k] === permission)
      ?.split(/(?=[A-Z])/)
      .join(' ');
  }
};

export const checkPermissions = (
  member: GuildMember,
  permissions: Array<PermissionResolvable>,
) => {
  const missingPermissions = getMissingPermissions(member, permissions);
  if (missingPermissions.length === 0) return null;
  return missingPermissions.map(formatPermissionName);
};

export const sendTimedMessage = (
  message: string,
  channel: TextChannel,
  duration: number,
) => {
  channel
    .send(message)
    .then((m) =>
      setTimeout(
        async () => (await channel.messages.fetch(m)).delete(),
        duration,
      ),
    );
  return;
};
