require('dotenv/config');
const { Client } = require('discord.js');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'billa-don.log');
fs.writeFileSync(logFilePath, 'Billa Don Logs\n', { flag: 'w' });

function logToFile(message) {
    fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
}

const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

client.on('ready', () => {
    console.log('Billa Don is ON!');
    logToFile('Billa Don is ON!');
});

const IGNORE_PREFIX = "!";
const CHANNELS = ['']; //Your Channel ID

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(IGNORE_PREFIX)) return;
    if (!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;

    await message.channel.sendTyping();

    const sendTypingInterval = setInterval(() => {
        message.channel.sendTyping();
    }, 5000);

    let conversation = [];

    conversation.push({
        role: 'system',
        content: 'Billa Don is here to assist you'
    });

    let prevMessages = await message.channel.messages.fetch({ limit: 10 });
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
        if (msg.author.bot && msg.author.id !== client.user.id) return;
        if (msg.content.startsWith(IGNORE_PREFIX)) return;

        const username = msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '');

        if (msg.author.id === client.user.id) {
            conversation.push({
                role: 'assistant',
                name: username,
                content: msg.content,
            });

            return;
        }

        conversation.push({
            role: 'user',
            name: username,
            content: msg.content,
        });
    });

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: conversation,
        });

        clearInterval(sendTypingInterval);

        if (!response) {
            const errorMessage = "Billa Don is having some trouble with OpenAI API. Try again in a moment.";
            message.reply(errorMessage);
            logToFile(errorMessage);
            return;
        }

        const responseMessage = response.choices[0].message.content;
        const chunkSizeLimit = 2000;

        for (let i = 0; i < responseMessage.length; i += chunkSizeLimit) {
            const chunk = responseMessage.substring(i, i + chunkSizeLimit);
            await message.reply(chunk);
        }

        logToFile(`Responded to message in channel ${message.channelId} by ${message.author.username}`);
    } catch (error) {
        console.error('Billa Error:\n', error);
        logToFile(`Error: ${error.message}`);
    }
});

client.login(process.env.BOT_TOKEN);
