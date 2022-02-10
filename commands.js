
const  { SlashCommandBuilder } =  require("@discordjs/builders")
const  { REST } =  require('@discordjs/rest');
const  { Routes } =  require('discord-api-types/v9');
const  { config } =  require("dotenv");
config({path: `${__dirname}/.env.${process.env.NODE_ENV}`});

const {BOT_TOKEN,CLIENT_ID,GUILD_ID}= process.env;

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

