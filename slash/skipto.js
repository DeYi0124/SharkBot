const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("skip to a specific song")
        .addNumberOption((option) => option.setName("tracknumber").setDescription("The track to skip to").setMinValue(1).setRequired(true)),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)

            if(!queue) 
                return await interaction.editReply("There are no songs in the queue")

            const trackNum = interaction.options.getNumber("tracknumber")
            if(trackNum > queue.tracks.length)
                return await interaction.editReply("invalid")
            queue.skipTo(trackNum - 1)
            await interaction.editReply(`skipped to track number ${trackNum}`)
        }
}