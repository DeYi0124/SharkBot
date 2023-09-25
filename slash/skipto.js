const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("skip to a specific song")
        .addNumberOption((option) => option.setName("tracknumber").setDescription("The track to skip to").setMinValue(1).setRequired(true)),

        run: async ({client, interaction}) => {
            // const queue = client.player.getQueue(interaction.guildId)
						let queue = client.player.nodes.get(interaction.guild)
            if(!queue) 
                return await interaction.editReply("There are no songs in the queue")

            const trackNum = interaction.options.getNumber("tracknumber")
            if(trackNum > queue.tracks.length)
                return await interaction.editReply("invalid")
            queue.node.skipTo(trackNum - 1)
            await interaction.editReply(`Sharks skipped to track number ${trackNum}`)
        }
}
