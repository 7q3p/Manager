const http = require('http');
http.createServer((req, res) => {
  res.write("Bot is alive!");
  res.end();
}).listen(process.env.PORT || 3000);
require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`${client.user.tag} ab online hai!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Test Command
    if (command === 'ping') {
        return message.reply('Pong! 🏓');
    }

    // Embed Create Command
    if (command === 'embed') {
        const rawContent = args.join(' ');
        const parts = rawContent.split('|');

        const title = parts[0]?.trim() || 'No Title';
        const description = parts[1]?.trim() || 'No Description';
        const color = parts[2]?.trim() || '#0099ff'; // Example: #ff0000 for Red

        const customEmbed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp()
            .setFooter({ text: `Banaya gaya: ${message.author.username}` });

        try {
            await message.delete(); // User ki command message delete karega taaki sirf embed dikhe
            return message.channel.send({ embeds: [customEmbed] });
        } catch (error) {
            return message.channel.send({ embeds: [customEmbed] });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);



