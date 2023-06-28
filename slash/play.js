const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const {QueryType} = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("play music from YT")
        .addSubcommand((subcommand)=>
            subcommand
                .setName("song")
                .setDescription("Loads a single song from an url")
                .addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
        )
        .addSubcommand((subcommand)=>
            subcommand
                .setName("playlist")
                .setDescription("Loads a list of songs from an url")
                .addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))      
        )
        .addSubcommand((subcommand)=>
            subcommand
                .setName("search")
                .setDescription("Search a song based on provided keywords")
                .addStringOption((option) => option.setName("searchterms").setDescription("the search keywords").setRequired(true))      
        ),
        run: async ({client, interaction}) => {
            if (!interaction.member.voice.channel)
                return interaction.editReply("You need to be in a voice channel to use this.")

            let queue = client.player.getQueue(interaction.guild)
            if(!queue) queue = client.player.createQueue(interaction.guild)
            if(!queue.connection) await queue.connect(interaction.member.voice.channel)

            let embed = new EmbedBuilder()

            if(interaction.options.getSubcommand() === "song") {
                let url = interaction.options.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user, 
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                console.log(result)
                if(result.tracks.length === 0)
                    return interaction.editReply("No results")
                
                const song = result.tracks[0]
                console.log(song)
                await queue.addTrack(song)
                embed
                    .setDescription(`Sharkmama: **[${song.title}](${song.url}** is queued)`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({text: `Duration: ${song.duration}`})
                //console.log(queue)
            } else if(interaction.options.getSubcommand() === "playlist") {
                let url = interaction.options.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user, 
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })
                if(result.tracks.length === 0)
                    return interaction.editReply("No results")
                
                    const playlist = result.playlist
                    console.log(playlist)
                    await queue.addTracks(result.tracks)
                    embed
                        .setDescription(`Sharkmama: **[${playlist.title}](${playlist.url}** is queued)`)
                        //.setThumbnail(playlist.thumbnail)
                        
            } else if(interaction.options.getSubcommand() === "search") {
                let url = interaction.options.getString("searchterms")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user, 
                    searchEngine: QueryType.AUTO
                })
                if(result.tracks.length === 0)
                    return interaction.editReply("No results")
                
                    const song = result.tracks[0]
                    await queue.addTrack(song)
                    embed
                        .setDescription(`Sharkmama: **[${song.title}](${song.url}** is queued)`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({text: `Duration: ${song.duration}`})
            }
            if(!queue.playing) {
                await queue.play()
            } 
            await interaction.editReply({
                embeds: [embed]
            })
        }
}