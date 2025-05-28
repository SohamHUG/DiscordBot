import { Client, GatewayIntentBits, Events } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]
})

client.once(Events.ClientReady, () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});


client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (
        message.content === '/bonjour' ||
        message.content === '/hello' ||
        message.content === '/hi' ||
        message.content === '/salut' ||
        message.content === '/coucou' ||
        message.content === '/yo' ||
        message.content === '/kf'
    ) {
        await message.reply(`Kwé i dit ${message.author}`);
    }

    if (message.content === '/ff') {
        await message.reply('GG GO NEXT. REPORT <@795281648849518592>');
    }

    if (message.content === '/gg') {
        await message.reply(`GG EZ. HONOR <@503125792654360588>`);
    }

    if (message.content === '/feu') {
        await message.reply('Brice il est où mon feu ? <@626076528463052802>');
    }

    if (message.content === '/play') {
        const channel = message.member.voice.channel;
        if (!channel) {
            return message.reply(`Vas dans un salon vocal l'amis ! ${message.author}`);
        }
        try {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false 
            });
            await message.reply('Mié là');
        } catch (err) {
            console.error(err);
            await message.reply('Erreur lors de la connexion au vocal.');
        }
    }

    if (message.content === '/exit') {
        const channel = message.member.voice.channel;
        if (!channel) {
            return message.reply('Tu dois être dans un salon vocal !');
        }
        try {
            const connection = getVoiceConnection(message.guild.id);
            if (connection) {
                connection.destroy();
                await message.reply('Trouve ça !');
            } else {
                await message.reply('Je ne suis pas dans un salon vocal.');
            }
        } catch (err) {
            console.error(err);
            await message.reply('Erreur lors de la déconnexion du vocal.');
        }
    }
});

client.login(TOKEN);