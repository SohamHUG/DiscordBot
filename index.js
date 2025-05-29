import { Client, GatewayIntentBits, Events, ConnectionService } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource } from '@discordjs/voice';
import dotenv from 'dotenv';
import path from 'path';


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

const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
    },
});

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
        await message.reply('FF GO NEXT. REPORT <@795281648849518592>');
    }

    if (message.content === '/gg') {
        await message.reply(`GG EZ. HONOR <@503125792654360588>`);
    }

    if (message.content === '/feu') {
        await message.reply('Brice il est où mon feu ? <@626076528463052802>');
    }

    if (message.content === '/brice') {
        await message.reply('Qui est <@626076528463052802> ? Un ti joueur valo pour les uns, un kapayèr briquet pour les autres. Mais pour tout le monde, le plus gros maille grenn de la terre !');
    }

    if (message.content.startsWith('/play')) {
        const channel = message.member.voice.channel;
        if (!channel) {
            return message.reply(`Vas dans un salon vocal l'amis ! ${message.author}`);
        }

        try {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false
            });

            connection.subscribe(player);
            const resource = createAudioResource(path.resolve('audio/test.mp3'));

            player.play(resource);

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
                player.stop();
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