const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("you want sharkmama to pause the music for a while."),

        run: async ({client, interaction}) => {
						let queue = client.player.nodes.get(interaction.guild)
            if(!queue) 
                return await interaction.editReply("sharkmama is confused that there is currently no music to pause.")

            queue.node.pause()
            await interaction.editReply("sharkmama has paused the music, use `/resume` to ask her to resume the music.")
        }
}
