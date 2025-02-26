const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("resume the shark music"),

        run: async ({client, interaction}) => {
            // const queue = client.player.getQueue(interaction.guildId)
						let queue = client.player.nodes.get(interaction.guild)
            if(!queue) 
                return await interaction.editReply("sharkmama is confused that there is currently no music to resume.")

            queue.node.resume()
            await interaction.editReply("the music is resumed by Sharks, use `/pause` to ask them to pause the music again.")
        }
}
