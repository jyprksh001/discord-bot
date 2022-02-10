import { Client, Intents } from 'discord.js'
import Guild from '../../models/Guild'
import HelpCommand from '../../commands/help'
import GetDefaultChannel from '../../components/getDefaultChannel'
import WelcomeMessage from '../../components/formatting/welcome'

async function DisCordServer() {

    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    })

    // login to discord
    await client.login(process.env.BOT_TOKEN)

    const guilds = await client.guilds.fetch()
    console.log({ guilds })

    // Events listeners
    client.on('messageCreate', async message => {
        console.log(message.content)
        if (
        message.content.includes('set channel') &&
        message.mentions.users.has(process.env.BOT_ID as string) &&
        message.member?.permissions.has('ADMINISTRATOR')
        ) {
        const guildId = message.guild?.id
        const channelId = message.content.includes('<#') ? message.content.split('<#')[1].replace('>', '') : false
        if (channelId) {
            await Guild.findOneAndUpdate({ id: guildId }, { channelId }, { new: true, upsert: true })
            message.reply(`Job notifications will now be sent to <#${channelId}>`)
        } else {
            message.reply(`Please tag a channel where you'd like job notifications to be sent to.`)
        }
        }

        if (
        message.content.includes('help') &&
        message.member?.permissions.has('ADMINISTRATOR') &&
        message.mentions.users.has(process.env.BOT_ID as string)
        ) {
        HelpCommand.fn(message)
        }
    })

    client.on('ready', () => console.log(`Logged in as ${client.user!.tag}!`))

    client.on('guildCreate', async (guild: any) => {
        console.log('guild created', guild)
        await guild.channels.cache.get(GetDefaultChannel(guild).id)!.send(WelcomeMessage(guild))
        console.log('welcome message sent')
    })
    
    client.on('guildDelete', guild => {
        console.log('guild deleted', guild)
    })

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return

        const { commandName } = interaction

        if (commandName === 'ping') {
        await interaction.reply('Pong!')
        } else if (commandName === 'beep') {
        await interaction.reply('Boop!')
        }
    })

    console.log(`Live in ${guilds.size} guild(s):`)

    client.guilds.cache.forEach(async guild => {
        const defaultChannel = GetDefaultChannel(guild)
        console.log(guild.memberCount, guild.name, '\t', '#' + defaultChannel.name, '(' + defaultChannel.id + ')')
    })
}

export default DisCordServer
