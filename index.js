const Discord = require('discord.js');
const messageHandler = require('./messageHandler.js');

global.client = new Discord.Client();

client.on('ready', () => console.log("Bot is ready!"));

global.config = require('./config.json');

client.on('message', messageHandler);

client.login(global.config.token);