import DiscordJS from "discord.js"
import {textResponse, prefix, readDeleted} from "./textResponse.js"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import {
  Attachment,
  IntentsBitField,
  GatewayIntentBits,
} from "discord.js"
import dotenv from "dotenv"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"

import { Player } from "discord-player"
import ytdl from "play-dl"
dotenv.config();

const LOAD_SLASH = process.argv[2] == "load";
const CLIENT_ID = "1029392717186355240";
const GUILD_ID = "457174952731475987";
const selfID = "1029392717186355240";

async function getInfo(url) {
  const info = await yytdl.getBasicInfo(url);
  return info;
}

const DMcmd = ["dsend"];
const DMdes = ["send message to Some channel"];

const client = new DiscordJS.Client({
  partials: [DiscordJS.Partials.Channel],
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildBans,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],
});


client.slashcommands = new DiscordJS.Collection();
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});


let commands = [];

// const slashFiles = fs
//   .readdirSync("./src/slash")
//   .filter((file) => file.endsWith(".cjs"));
// for (const file of slashFiles) {
//   const slashcmd = require(`./slash/${file}`);
//   client.slashcommands.set(slashcmd.data.name, slashcmd);
//
//   if (LOAD_SLASH) commands.push(slashcmd.data.toJSON());
// }

if (LOAD_SLASH) {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  console.log("Deploying slash commands");
  rest
    .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    })
    .then(() => {
      console.log("suscess");
      process.exit(0);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
} else {
  client.on("ready", () => {
    console.log("The shark is ready");
  });

  client.on("interactionCreate", async (interaction) => {
    async function handleCommand() {
      if (!interaction.isCommand()) {
        return;
      }

      const slashcmd = client.slashcommands.get(interaction.commandName);
      if (!slashcmd) interaction.reply("Not valid slashcmd");

      await interaction.deferReply();
      await slashcmd.run({ client, interaction });
    }
    handleCommand();
    const { commandName, options } = interaction;
  });

  client.on("messageDelete", (message) => {
    if (message.author.bot) return;
    if (readDeleted) {
      let c = message.channel;
      c.send(
        "Beware of what you say, the holy Sharkmama has caught you deleting what you said!:\n\n" +
          `${message.author} has said: __**${message.content}**__\n, and tried so hard to delete it!`,
      );
    } else {
      let c = message.channel;
      c.send(
        "oops, looks like\n" +
          `${message.author} has deleted a message but sharkmama does not have the permission to see it.`,
      );
    }
  });

  client.on("messageCreate", async (message) => {
    if (
      (!message.content.startsWith("！") &&
        prefix === "!" &&
        !message.content.startsWith(prefix)) ||
      message.author.bot
    )
      return;
    if(!message.guild) {
      const args = message.content.slice(prefix.length).trim().split(" ");
      const cmd = args.shift().toLowerCase();
      if (message.author.id === selfID) {
        // console.log("talk to self");
      } else {
        console.log("DMing")//available: {send}
        if(cmd === "send") {
          if(args.length != 3) {
            return message.channel.send("Dear DM user, Usage: send [message] [guildID] [channelID]")
          }
          let g = args[1]
          let c = args[2]
          const DMguild = client.guilds.cache.get(g)
          if(!DMguild) {
            return message.channel.send("Guild not existed in the Shark's eye")
          }
          const DMchannel = DMguild.channels.cache.get(c)
          if(!DMchannel) {
            return message.channel.send("Channel not existed in the Guild")
          }
          DMchannel.send(args[0])
        }
      }
    }

    if(message.guild) {
      if (message.content.startsWith("！") && prefix === "!") {
        message.channel.send(
          "you used chinese prefix which seems to be a typo.\n",
        );
      }
      const args = message.content.slice(prefix.length).trim().split(" ");
      const cmd = args.shift().toLowerCase();
      if (message.author.id === selfID) {
        // console.log("talk to self");
      } else {
        textResponse(message, cmd, args); 
      }
    }
  });


  client.login(process.env.TOKEN);
}

