const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("shuffles the queue using magical shark power!"),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)

            if(!queue) 
                return await interaction.editReply("sharkmama is confused that there is currently no music to shuffle.")

            queue.shuffle()
            await interaction.editReply(`Sharks shuffled ${queue.tracks.length} songs`)
        }
}