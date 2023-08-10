<h1 style="text-align:center;">Discord.js v14 Bot Template</h1>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=discord,ts,nodejs,postgres,supabase" />
  </a>
</p>

## Features

- 🟦 Typescript
- 💧 Drizzle ORM
- ✔️ Zod Validation
- 🔥 Slash commands (supports auto complete!)
- ✉️ Message commands
- 🕛 Cooldowns
- 🏴 Detailed Permissions
- 💪 Event & Command handlers
- 🐶 Husky hooks

## Installation, Build and Run

1. Clone the repository then create a file named `.env` and fill it out accordingly (see `.env.example`)

```js
TOKEN=BOT TOKEN
CLIENT_ID=BOTS CLIENT ID
PREFIX=.
DATABASE_URL=YOUR DB CONNECTION STRING
```

2. Install the packages and dependencies by running the following command:

```bash
$ pnpm install
```

3. Compile your TypeScript code to JavaScript by running the following command:

```bash
$ pnpm run build
```

4. Once the build is complete it will generated a folder named `dist` that contains compiled version of your ts code to js. You can run the following command in your terminal to run the project:

```bash
$ pnpm run start
```

---

#### Run in development mode

To run in development mode, you can run the following command in your terminal:

```bash
$ pnpm run dev
```

## Drizzle

1. Create your schemas in `src/db/schemas` see [Drizzle Docs](https://orm.drizzle.team/docs/sql-schema-declaration) for more info.
2. Generate your migrations based on your schemas by running the following command:

```bash
$ pnpm run db:generate
```

3. Push your schema changes directly to the database by running the following command:

```bash
$ pnpm run db:push
```

4. (Optional) Run Drizzle Kit studio to manage your database by running the following command(see [Drizzle Kit Studio Docs](https://orm.drizzle.team/drizzle-studio/overview) for more info.):

```bash
$ pnpm run db:studio
```

## Acknowledgments 🔥

Big Props to [MericcaN41](https://github.com/MericcaN41) for the [discord.js v14 template](https://github.com/MericcaN41/discordjs-v14-template-ts) that I used as a base for this template.

- [Drizzle](https://orm.drizzle.team/) - 🔥 ORM
- [Zod](https://zod.dev/) - 🔥 validation library
- [Discord.js](https://discord.js.org/#/) - 🔥 discord library

## License

This project is licensed under the MIT License.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
