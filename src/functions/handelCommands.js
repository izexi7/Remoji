const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');
const config = require('../../config.js');

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                console.log(chalk.yellow('[Commands]',command.data.name));
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({
            version: '9'
        }).setToken(config.token);

        (async () => {
            try {
                console.log(chalk.green('[Discord API] Commands loaded.'));
                console.log(chalk.green('[Discord API] Events loaded.'));


                await rest.put(
                    Routes.applicationCommands(config.clientid), {
                        body: client.commandArray
                    },
                );
              //  console.log(chalk.white('Version',version));

            } catch (error) {
                console.error(error);
            }
        })();
    };
};