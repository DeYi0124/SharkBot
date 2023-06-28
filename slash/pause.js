const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("you want sharkmama to pause the music for a while."),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)

            if(!queue) 
                return await interaction.editReply("sharkmama is confused that there is currently no music to pause.")

            queue.setPaused(true)
            await interaction.editReply("sharkmama has paused the music, use `/resume` to ask her to resume the music.")
        }
}