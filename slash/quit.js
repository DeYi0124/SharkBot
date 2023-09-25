const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("tell DJ sharkmama to leave and clear the queue."),

        run: async ({client, interaction}) => {
            // const queue = client.player.getQueue(interaction.guildId)
						let queue = client.player.nodes.get(interaction.guild)
            if(!queue) 
                return await interaction.editReply("Sharks: how can you stop the music while there is no music playing?")

            queue.clear()
            queue.delete()
            await interaction.editReply("sharkmama left VC and the queue is cleared.")
        }
}
