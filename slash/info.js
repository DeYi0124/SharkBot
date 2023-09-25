const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("display info of current song DJ shark is playing"),

        run: async ({client, interaction}) => {
            // const queue = client.player.getQueue(interaction.guildId)

						let queue = client.player.nodes.get(interaction.guild)
            if(!queue) 
                return await interaction.editReply("There are no songs in the shark's disk")

            let bar = queue.node.createProgressBar({
                queue: false, 
                length: 19
            })

            const song = queue.currentTrack

            await interaction.editReply({
                embeds: [new EmbedBuilder()
                .setThumbnail(song.thumbnail)
                .setDescription(`sharkmama is now playing: [${song.title}](${song.url})\n\n` + bar)
            ],
            })
        }
}
