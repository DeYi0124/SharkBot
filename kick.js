module.exports = {
    name: 'kick',
    execute(message, args) {
        const member = message.author;
        const target = message.guild.members.cache.get(member.id);
        target.kick();
        message.channel.send("bye");
    }
}