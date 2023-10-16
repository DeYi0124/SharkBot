const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const {QueryType} = require("discord-player")
const { YouTubeExtractor } = require('@discord-player/extractor')


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
						
						await client.player.extractors.loadDefault()
            if (!interaction.member.voice.channel)
                return interaction.editReply("You need to be in a voice channel to use this.")

            let queue = client.player.nodes.get(interaction.guild)
						// console.log(queue)
            if(!queue) queue = client.player.queues.create(interaction.guild)
            if(!queue.connection) await queue.connect(interaction.member.voice.channel)

            let embed = new EmbedBuilder()

            if(interaction.options.getSubcommand() === "song") {
                let url = interaction.options.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user, 
                    // searchEngine: `ext:${YouTubeExtractor.identifier}`
										fallbackSearchEngine: 'auto'
                })
                // console.log(result)
                if(result.tracks.length === 0)
                    return interaction.editReply("No results")
                
                const song = result.tracks[0]
                //console.log(song)
                await queue.addTrack(song)
                embed
                    .setDescription(`Sharkmama: **[${song.title}](${song.url}** is queued)`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({text: `Duration: ${song.duration}`})
                // console.log(queue)
            } else if(interaction.options.getSubcommand() === "playlist") {
                let url = interaction.options.getString("url") 
								const result = await client.player.search(url, {
                    requestedBy: interaction.user, 
                    // searchEngine: `ext:${YouTubeExtractor.identifier}`	
										fallbackSearchEngine: 'youtubePlaylist'
                })
								console.log(result)
                if(result.tracks.length === 0)
                    return interaction.editReply("No results")
                
								const playlist = result.playlist
								console.log(playlist)
								await queue.addTrack(result.tracks)
								embed
										.setDescription(`Sharkmama: **[${playlist.title}](${playlist.url}** is queued)`)
										.setThumbnail(playlist.thumbnail)
										.setFooter({text: `Duration: ${playlist.durationFormatted}`})
                        
            } else if(interaction.options.getSubcommand() === "search") {
                let url = interaction.options.getString("searchterms")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user, 
                    fallbackSearchEngine: 'youtubeSearch'
                })
                // console.log(result)
                if(result.tracks.length === 0)
                    return interaction.editReply("No results")
                
								const song = result.tracks[0]
								await queue.addTrack(song)
								embed
										.setDescription(`Sharkmama: **[${song.title}](${song.url}** is queued)`)
										.setThumbnail(song.thumbnail)
										.setFooter({text: `Duration: ${song.duration}`})
            }
						console.log(queue.tracks.data)
            if(!queue.isPlaying()) {
                await queue.play(queue.tracks.data)
								.then(console.log(queue))
            } 
            await interaction.editReply({
                embeds: [embed]
            })
        }
}
