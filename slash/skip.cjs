const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("you dont like the current song Sharkmama represent and want to skip it"),

        run: async ({client, interaction}) => {
						let queue = client.player.nodes.get(interaction.guild)
            if(!queue) 
                return await interaction.editReply("There are no songs in the queue --- by Shark")

            const curr = queue.currentTrack
            
            queue.node.skip()
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder().setDescription(`${curr.title} has been skipped, sharkmama now changed song`).setThumbnail(curr.thumbnail)
                ]
            })
        }
}
