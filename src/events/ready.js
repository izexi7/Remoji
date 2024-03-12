const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(chalk.white(`Logged in as: ${client.user.tag} (${client.user.id})`));

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};
