const DiscordJS = require("discord.js");
const {
  Attachment,
  IntentsBitField,
  GatewayIntentBits,
} = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const dotenv = require("dotenv");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { LolApi, Constants } = require("twisted");
const yytdl = require("ytdl-core");
const SoundBoard = require("djs-soundboard");
const fetch = require("node-fetch")
const riotKey = "RGAPI-812f9f96-a057-479f-a141-0c128b511aca"
const sp = "%20"

//import {Player} from 'discord-player'
//import Discord from 'discord.io';
const gis = require("g-i-s"); //import gis from 'g-i-s';
const fs = require("fs"); //import fs from 'fs';
const { API } = require("vandal.js");
const { Player } = require("discord-player");
const download = require("downloadjs");

const ytdl = require("play-dl");
//import ytdl from 'ytdl-core';
dotenv.config();

const LOAD_SLASH = process.argv[2] == "load";
const CLIENT_ID = "1029392717186355240";
const GUILD_ID = "457174952731475987";
const selfID = "1029392717186355240";
const voiceSb = [
  "ara-ara",
  "arigato",
  "fuck-you",
  "kamehameha",
  "katon",
  "kawaii",
  "kiras_laugh",
  "niconiconii",
  "oni-chan",
  "pikapika-42387",
  "senpai",
  "turuturu",
  "bass-boost",
  "discord-notification",
  "error",
  "fart",
  "okbye",
  "roblox-death",
  "shutdown",
  "tecnobladebruh",
  "villager",
  "and-his-name-is-john-cena-1",
  "badpiggiessong",
  "bruh",
  "bullshit",
  "chaipilo",
  "chala-ja-bsdk",
  "coffin-dance",
  "dammit",
  "directed-by-robert-b_voI2Z4T",
  "douche",
  "enemy-spotted",
  "fight",
  "finally",
  "fucked-up",
  "helicopter-helicopter",
  "herewegoagain",
  "holdup",
  "how",
  "iamstupid",
  "imleaving",
  "impressingbuttons",
  "imsogood",
  "it-was-at-this-moment-that-he-he-knew-he-f-cked-up",
  "itsuseless",
  "knackebrod",
  "land-kara",
  "lesgo",
  "loudnoise",
  "marGyaMadar",
  "mcdzombie",
  "nani_Pmxf5n3",
  "nice",
  "nikal",
  "noice",
  "nonono",
  "noo",
  "noway",
  "nvm",
  "oh-no-no-no-tik-tok-song-sound-effect",
  "ok-simp",
  "omg",
  "ooeeh",
  "rickroll",
  "shutup",
  "somethingstupid",
  "suckAdick",
  "super-idol",
  "surprise-motherfucker",
  "tf_nemesis",
  "thatsagoodone",
  "the-rap-battle-parody-oh",
  "toktik",
  "underthewater",
  "virus",
  "wee",
  "what",
  "what2",
  "whoeha",
  "why-are",
  "wiener",
  "wtf",
  "wurst",
  "x-files-theme-song-copy",
  "yeah",
  "female-orgasm",
  "fuck",
  "fuck2",
  "fuckfuckfuckfuck",
  "fuckmedaddy",
  "fuckno",
  "huge-boobs",
  "moan",
  "nsfwEarrape",
  "orgasmreal",
  "pussy",
  "turtlesex",
  "yamete",
  "a-few-moments-later-hd",
  "im-ready",
  "one-hour-later-spongebob-time-card-96",
  "sbtrapvinebycarb0n",
  "spongebob-2000-years-later",
  "spongebob-dolphin-censor",
  "spongebob-fail",
  "spongebob-hi-how-are-ya-",
  "strongpunch",
  "you-what-spongebob",
];

async function getInfo(url) {
  const info = await yytdl.getBasicInfo(url);
  return info;
}

const max_bullet = 6;
var bullet = max_bullet;
var prefix = "!";
var readDeleted = false;
const food = ["總匯三明治", "法國長棍", "鐵板麵", "油條"];
const drink = ["奶茶", "紅茶", "綠茶", "可樂", "牛奶", "豆漿"];
const agent = [
  "Astra",
  "Breach",
  "Brimstone",
  "Chamber",
  "Cypher",
  "Jett",
  "Kay/O",
  "Killjoy",
  "Neon",
  "Omen",
  "Phoenix",
  "Raze",
  "Reyna",
  "Sage",
  "Skye",
  "Sova",
  "Viper",
  "Yoru",
  "horbor",
  "deadlock",
];

const command = [
  "greet",
  "help",
  "breakfast",
  "agent",
  "watchdel",
  "editprefix",
  "rat",
  "checksvr",
  "add",
  "shark",
  "quote",
  "kick",
  "dps",
  "tank",
  "heal",
  "avatar",
  "search",
  "roll",
  "spam",
  "role",
  "nick",
  "valo",
  "shoot",
  "download",
  "sb",
  "lol"
];
const DMcmd = ["dsend"];
const DMdes = ["send message to Some channel"];

const helpCmd = [
  [1, 2, 6, 8, 9, 10, 15, 16, 22, 23, 24],
  [3, 12, 13, 14, 21, 25],
  [4, 5, 7, 11, 17, 18, 19, 20],
];
const helpThm = ["general commands", "game commands", "server commands"];
const dps = [
  "Ashe",
  "Bastion",
  "Cassidy",
  "Echo",
  "Genji",
  "Hanzo",
  "Junkrat",
  "Mei",
  "Pharah",
  "Reaper",
  "Sojourn",
  "Soldier: 76",
  "Sombra",
  "Symmetra",
  "Tornjörn",
  "Tracer",
  "Widowmaker",
];
const tank = [
  "D.va",
  "Junker Queen",
  "Sigma",
  "Ramattra",
  "Orisa",
  "Reinhardt",
  "Roadhog",
  "Winston",
  "Zarya",
  "Wrecking ball",
  "Doomfist",
];
const sup = [
  "Ana",
  "Baptiste",
  "Brigitte",
  "Kiriko",
  "Lúcio",
  "Mercy",
  "Moira",
  "Zenyatta",
];
const details = [
  "to call sharkmama",
  "to get command list",
  "to ask for today's Sharkmama Recommended Dishes",
  "to ask what agent to play in Valorant",
  `to change permission of reading deleted message.(current: ${readDeleted})`,
  `change current prefix.(current: ${prefix})`,
  "Rats",
  "check server status",
  "to add some quotes.",
  "shark",
  "to get random nonsense said by someone you may know.",
  "to ask Sharks to kick somebody out!",
  "to ask sharkmama what dps to play in Overwatch",
  "to ask sharkmama what tank to play in Overwatch",
  "to ask sharkmama what healer to play in Overwatch",
  "to ask sharkmama to give you the avatar of the tagged users (will be yourself if no tags)",
  "to ask the Holy sharkmama for some images.",
  "get lucky number from Sharkmama!",
  "Sharkmama wanna bombard the channel!",
  "sharks will play with the roles in the channel",
  "Sharkmama will give the tagged user a new nickname (made by Shark)",
  "Sharkmama will take a look into the valorant account of the player",
  "ask a Russian shark to shoot you in a Russian Roulette way!",
  "Shark will download stuff from the SharkInternet only for you uwu",
  "Random Shark noises.",
  "Sharks will start to fetch the desired player data in League of Legend!"
];

function getRandom(x) {
  return Math.floor(Math.random() * x);
}

function leftToEight() {
  var d = new Date();
  return -d + d.setHours(8, 0, 0, 0);
}

async function fetchSumByName(name) {
  while(name.includes(" ")) {
    let s = name.indexOf(" ")
    name = name.subString(0, s) + sp + name.subString(s+1)
  }
  const link = `https://tw2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${riotKey}`
  const response = await fetch(link)
  let data = response.json();
  setTimeout(function() {
    console.log(data)
    console.log(link)
  }, 5000)
}
// const Partials = new DiscordJS.Partials()

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

// client.player.extractors.register(YouTubeExtractor);

let commands = [];

const slashFiles = fs
  .readdirSync("./slash")
  .filter((file) => file.endsWith(".js"));
for (const file of slashFiles) {
  const slashcmd = require(`./slash/${file}`);
  // console.log(file)
  client.slashcommands.set(slashcmd.data.name, slashcmd);

  if (LOAD_SLASH) commands.push(slashcmd.data.toJSON());
}

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
    const guildID = "457174952731475987";
    const guild = client.guilds.cache.get(guildID);
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

  client.on("messageCreate", (message) => {
    if (
      (!message.content.startsWith("！") &&
        prefix === "!" &&
        !message.content.startsWith(prefix)) ||
      message.author.bot
    )
      return;
    if (!message.guild && message.author.id != "508461238444097614")
      return message.channel.send(
        "The shark can't recognize you! DM commands locked!",
      );
    if (message.content.startsWith("！") && prefix === "!") {
      message.channel.send(
        "you used chinese prefix which seems to be a typo.\n",
      );
    }
    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    // console.log("message!")
    if (message.author.id === selfID) {
      console.log("talk to self");
    } else {
      console.log("talk to other");
      if (cmd === command[0]) {
        message.reply({
          content: "mama",
        });
        message.channel.send("Greeting from sharkmama ^^");
      }

      if (cmd === command[1]) {
        if (args.length != 1)
          return message.channel.send(
            `as a reminder from Sharks. \nUsage:\"help [page(0~${
              helpCmd.length - 1
            })]\", dear ${message.author}`,
          );

        let cmdList = `shark commands (page ${args[0]} - ${
          helpThm[Number(args[0])]
        }) listed:\n(the ? sign at the end indecates unreleased commands)\ngreet - **to call sharkmama**\n`;
        for (let i = 0; i < helpCmd[Number(args[0])].length; i++) {
          cmdList += prefix;
          cmdList += `${command[helpCmd[Number(args[0])][i]]} - **${
            details[helpCmd[Number(args[0])][i]]
          }**\n`;
        }
        message.reply({
          content: cmdList,
        });
        //console.log(message.channel);
      }

      if (cmd === command[2]) {
        let f = getRandom(food.length);
        let d = getRandom(drink.length);
        message.reply({
          content: `Dear ${message.author}, hope you enjoy today's Sharkmama Recommended Dishes: (${food[f]}, ${drink[d]})`,
        });
      }

      if (cmd === command[3]) {
        if (message.author.id === "589767352128897024") {
          message.channel.send(
            `Dear ${message.author}, Sharkmama want to watch you do your homework and stop playing Valorant.`,
          );
          return;
        }
        let p = getRandom(agent.length);
        message.reply({
          content: `Dear ${message.author}, Sharkmama want to watch you play *${agent[p]}* in Valorant`,
        });
      }

      if (cmd === command[4]) {
        readDeleted = !readDeleted;
        message.reply({
          content: `Sharkmama ${
            readDeleted ? "can" : "can't"
          } read deleted message and tell everyone else!`,
        });
      }

      if (cmd === command[5]) {
        if (args.length != 1)
          return message.channel.send(
            `as a reminder from Sharks. \nUsage:\"editprefix [new prefix]\", dear ${message.author}`,
          );
        prefix = args[0];
        message.reply({
          content: `current prefix has been changed into ${prefix}.`,
        });
      }

      if (cmd === command[6]) {
        imageFd(message, "rats");
      }

      if (cmd === command[7]) {
        let name = message.guild.name;
        let num = message.guild.memberCount;
        message.reply({
          content: `${name} currently has ${num} member(s) inside the server.`,
        });
      }

      if (cmd === command[8]) {
        if (args.length != 2)
          return message.channel.send(
            `as a reminder from Sharks. \nUsage:\"add [new quotes] [who said that]\", dear ${message.author}`,
          );
        let quo = args[0] + "\n";
        let ppl = args[1] + "\n";
        fs.appendFileSync("textFiles/quotes.txt", quo, function (err) {
          if (err) throw err;
          console.log("quotes updated!");
        });
        fs.appendFileSync("textFiles/quotes.txt", ppl, function (err) {
          if (err) throw err;
          console.log("people updated!");
        });
        message.channel.send("Shark has the quote added into sharkbook!");
      }

      if (cmd === command[9]) {
        imageFd(message, "cute ikea shark");
      }

      if (cmd === command[10]) {
        var Quotes = fs.readFileSync("textFiles/quotes.txt", "utf-8");
        var randTalk = Quotes.split("\n");
        var randTalkLen = randTalk.length;
        let nsidx = randTalkLen;
        while (nsidx >= randTalkLen - 1 || nsidx % 2 != 0) {
          nsidx = getRandom(randTalkLen);
        }
        message.reply({
          content:
            `#${nsidx / 2 + 1} / ${(randTalkLen + 1) / 2}  :  ` +
            randTalk[nsidx] +
            "\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t------" +
            randTalk[nsidx + 1],
        });
      }

      if (cmd === command[11]) {
        //console.log('kicking(still in progress)');
        //client.commands.get('kick').execute(message, args);
        if (message.mentions.users.size != 1) {
          return message.reply(
            'a little reminder of kicking someone out from Sharks:\nUsage: "kick [tag user]"',
          );
        }
        let taggedUser = message.mentions.users.first();
        message.channel.send(
          `Sharkmama is going to kick: ${taggedUser.username}`,
        );

        // console.log(taggedUser)
        if (message.author.id != "508461238444097614")
          return message.channel.send(
            "Sharkmama thinks that You don't have permission to kick people",
          );
        if (!taggedUser) return message.channel.send("That was not a member.");

        if (message.member.id === taggedUser.id)
          return message.channel.send(
            "Why would you want Sharkmama to kick you my dear.",
          );
        if (taggedUser.id == client.user.id)
          return message.channel.send(
            "You can't kick the one and only Sharkmama!",
          );
        // taggedUser.kick()
        // console.log(message.guild.members)
        const gd = message.guild;
        const usr = gd.members.kick(taggedUser.id);
        console.log(usr);
        // usr.avatarURL()
      }

      if (cmd === command[12]) {
        let p = getRandom(dps.length);
        message.reply({
          content: `Dear ${message.author}, time to get on highlight with *${dps[p]}* in Overwatch`,
        });
      }
      if (cmd === command[13]) {
        let p = getRandom(tank.length);
        message.reply({
          content: `Dear ${message.author}, I hope you enjoy *${tank[p]}* as a tank in Overwatch`,
        });
      }
      if (cmd === command[14]) {
        let p = getRandom(sup.length);
        message.reply({
          content: `Dear ${message.author}, good luck having a stroke playing *${sup[p]}* to heal your team in Overwatch`,
        });
      }
      if (cmd === command[15]) {
        if (!message.mentions.users.size) {
          return message.channel.send(
            `Your avatar: <${message.author.displayAvatarURL({
              format: "png",
              dynamic: true,
            })}>`,
          );
        }

        const avatarList = message.mentions.users.map((user) => {
          return `${user.username}'s avatar: <${user.avatarURL({
            format: "png",
            dynamic: true,
          })}>`;
        });

        // console.log(avatarList);
        avatarList.forEach((avatar) => message.channel.send(`${avatar}`));
        //message.channel.send("still in progress on other's avater");
      }
      if (cmd === command[16]) {
        if (args.length != 1)
          return message.channel.send(
            `as a reminder from Sharks. \nUsage:\"search [keyword]\", dear ${message.author}`,
          );
        imageFd(message, args[0]);
      }
      if (cmd === command[17]) {
        if (args.length != 1)
          return message.channel.send(
            `as a reminder from Sharks. \nUsage:\"roll [upper bound]\", dear ${message.author}`,
          );
        let rn = getRandom(Number(args));
        message.reply({
          content: `Today's luck shark number is ${rn}.`,
        });
      }

      if (cmd === command[18]) {
        if (args.length != 1)
          return message.channel.send(
            `as a reminder from Sharks. \nUsage:\"spam [words]\", dear ${message.author}`,
          );
        let channel = message.channel;
        span(channel, args[0]);
        console.log("spamming started");
      }

      if (cmd === command[19]) {
        if (args.length == 0)
          return message.channel.send(
            `as a reminder from Sharks. \nUsage:\"role [number]\", dear ${message.author}\nHint:\nnumber 0 to display all roles\nnumber in role list to become that role`,
          );
        let opt = args[0];
        if (Number(opt) < 0) {
          message.channel.send("Sike! that's the wrong number!\n");
        } else if (opt == "0") {
          message.channel.send(
            "Sharkmama is displaying all the roles in the server:\n",
          );
          displayRoles(message);
        } else {
          message.channel.send(
            "Sharkmama is trying to give you another role in the server:\n",
          );
          changeRoles(message, Number(args[0]));
        }
      }
      if (cmd === command[20]) {
        if (args.length != 2)
          return message.channel.send(
            `as a reminder from Sharks. \nUsage:\"nick [taggedUser] [desired name]\", dear ${message.author}`,
          );
        if (message.mentions.users.size != 1) {
          return message.reply(
            "dear, you need to tag only one user for sharkmama to process..",
          );
        }
        let usr = args[0];
        let name = args[1];

        message.channel.send(
          `${message.mentions.users.first().username}'s current nickname: ${
            message.mentions.members.first().nickname
          }`,
        );
        message.mentions.members.first().setNickname(name);
        message.channel.send(`Shark has changed the user's nickname!`);
      }

      if (cmd === command[21]) {
        if (args.length != 2)
          return message.channel.send(
            `as a reminder from Sharks. \nUsage:\"valo [user's name] [riot ID]\", dear ${message.author}`,
          );
        valoSch(args[0], args[1], message);
      }

      if (cmd === command[22]) {
        if (args.length > 1)
          return message.channel.send(
            `as a reminder from Sharks. \nUsage:\"shoot [options]\", dear ${message.author}\nHint:\nkeep options empty to take the risk to get shot\noptions=reset is to reset the Shark's Revolver\noptions=list to show the number of bullets left inside the gun.`,
          );

        if (bullet <= 0 && args.length == 0) {
          bullet = max_bullet;
          return message.channel.send(
            "Shark felt sorry that he didn't reload his revolver, now you can take the shot!",
          );
        }

        if (args.length == 1) {
          let act = args[0];
          if (act == "reset") {
            bullet = max_bullet;
            return message.channel.send(
              "the revolver is now locked and loaded! It's ready to knock someone out!",
            );
          } else if (act == "list") {
            return message.channel.send(
              `Shark took some time calculating its bullet numbers and said it had pulled its trigger ${
                max_bullet - bullet
              }/${max_bullet} time(s)`,
            );
          } else {
            return message.channel.send(
              'The Russian Shark thinks that you freaked out and started to type nonsense.\nUsage:"shoot [options]"Hint:\nkeep options empty to take the risk to get shot\noptions=reset is to reset the Shark\'s Revolver\noptions=list to show the number of bullets left inside the gun.',
            );
          }
        }

        if (args.length == 0) {
          if (!message.member.voice.channelId) {
            return message.channel.send(
              'The Russian Shark thinks that you are a **pussy** since you are too afraid to take the risk!\n\nGo to a voice channel to use the command.\nUsage:"shoot [options]"\n\nHint: \nkeep options empty to take the risk to get shot\noptions=reset is to reset the Shark\'s Revolver\noptions=list to show the number of bullets left inside the gun.',
            );
          }
          fire(message);
        }
      }

      if (cmd === command[23]) {
        if (args.length != 2)
          return message.channel
            .send(`as a reminder from Sharks. \nUsage:\"download [url] [flags]\", dear ${message.author}\nflags:
                                                \n0 - Youtube link to mp3 files
                                                \n1 - video downloader`);
        let url = args[0];
        let fg = args[1];
        if (fg == "0") {
          if (!yytdl.validateURL(url))
            return message.channel.send(
              "Sharks working in youtube don't know what the given url is!",
            );
          DL(url, message, 0);
        } else if (fg == "1") {
          DL(url, message, 1);
        } else {
          message.channel.send(
            "That is an unknown request, Sharkmama has never seen such wierd person like you.",
          );
        }
      }
      if (cmd === command[24]) {
        if (!message.member.voice.channel) {
          return message.channel.send(
            "Dear, be at least in one voice channel to use call Sharkmama.",
          );
        }
        if (args.length != 1) {
          return message.channel
            .send(`as a reminder from Sharks. \nUsage:\"sb [sounds]\", dear ${message.author}\navailable sounds:
                                                \n**empty** - list all the 108 sounds available
                                                \n- **0. ara-ara**\n- **1. arigato**\n- **2. fuck-you**\n- **3. kamehameha**\n- **4. katon**\n- **5. kawaii**\n- **6. kiras_laugh**\n- **7. niconiconii**\n- **8. oni-chan**\n- **9. pikapika-42387**\n- **10. senpai**\n- **11. turuturu**
                                                \n- **12. bass-boost**\n- **13. discord-notification**\n- **14. error**\n- **15. fart**\n- **16. okbye**\n- **17. roblox-death**\n- **18. shutdown**\n- **19. tecnobladebruh**\n- **20. villager**
                                                \n- **21. and-his-name-is-john-cena-1**\n- **22. badpiggiessong**\n- **23. bruh**\n- **24. bullshit**\n- **25. chaipilo**\n- **26. chala-ja-bsdk**\n- **27. coffin-dance**\n- **28. dammit**\n- **29. directed-by-robert-b_voI2Z4T**\n- **30. douche**\n- **31. enemy-spotted**\n- **32. fight**\n- **33. finally**\n- **34. fucked-up**\n- **35. helicopter-helicopter**\n- **36. herewegoagain**\n- **37. holdup**\n- **38. how**\n- **39. iamstupid**\n- **40. imleaving**\n- **41. impressingbuttons**\n- **42. imsogood**\n- **43. it-was-at-this-moment-that-he-he-knew-he-f-cked-up**\n- **44. itsuseless**\n- **45. knackebrod**\n- **46. land-kara**\n- **47. lesgo**\n- **48. loudnoise**\n- **49. marGyaMadar**\n- **50. mcdzombie**\n- **51. nani_Pmxf5n3**\n- **52. nice**\n- **53. nikal**\n- **54. noice**\n- **55. nonono**\n- **56. noo**\n- **57. noway**\n- **58. nvm**\n- **59. oh-no-no-no-tik-tok-song-sound-effect**\n- **60. ok-simp**\n- **61. omg**\n- **62. ooeeh**\n- **63. rickroll**\n- **64. shutup**\n- **65. somethingstupid**\n- **66. suckAdick**\n- **67. super-idol**\n- **68. surprise-motherfucker**\n- **69. tf_nemesis**\n- **70. thatsagoodone**\n- **71. the-rap-battle-parody-oh**\n- **72. toktik**\n- **73. underthewater**\n- **74. virus**\n- **75. wee**\n- **76. what**\n- **77. what2**\n- **78. whoeha**\n- **79. why-are**\n- **80. wiener**\n- **81. wtf**\n- **82. wurst**\n- **83. x-files-theme-song-copy**\n- **84. yeah**`);
          // message.channel.send("The following sounds may be too exciting for sharks ><:\n- **85. female-orgasm**\n- **86. fuck**\n- **87. fuck2**\n- **88. fuckfuckfuckfuck**\n- **89. fuckmedaddy**\n- **90. fuckno**\n- **91. huge-boobs**\n- **92. moan**\n- **93. nsfwEarrape**\n- **94. orgasmreal**\n- **95. pussy**\n- **96. turtlesex**\n- **97. yamete**\n- **98. a-few-moments-later-hd**\n- **99. im-ready**\n- **100. one-hour-later-spongebob-time-card-96**\n- **101. sbtrapvinebycarb0n**\n- **102. spongebob-2000-years-later**\n- **103. spongebob-dolphin-censor**\n- **104. spongebob-fail**\n- **105. spongebob-hi-how-are-ya-**\n- **106. strongpunch**\n- **107. you-what-spongebob**\n")
        }
        let sound = new SoundBoard();
        let channel = message.member.voice.channel; // required*
        let sb = args[0];
        sound
          .play(channel, voiceSb[Number(sb)])
          .then(() => {
            message.channel.send("Sharks has made some noises!");
          })
          .catch(() => {
            message.channel.send("Welp, Sharks can't make this kind of noise.");
          }); //Sound
      }
    }
  });

  async function DL(url, message, flag) {
    message.channel.send("Sharks are looking for the file...");
    if (flag == 0) {
      let res = yytdl(url, { filter: "audioonly", format: "mp3" });
      // console.log(res)
      let now = new Date();
      let wd = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      let mn = now.getMonth() + 1;
      let d = now.getDate();
      let h = now.getHours();
      let minute = now.getMinutes();
      let sec = now.getSeconds();
      if (mn < 10) mn = "0" + (now.getMonth() + 1);
      if (d < 10) d = "0" + now.getDate();
      if (h < 10) h = "0" + now.getHours();
      if (minute < 10) minute = "0" + now.getMinutes();
      if (sec < 10) sec = "0" + now.getSeconds();

      let audioName = [now.getFullYear(), mn, d, h, minute, sec].join("");

      let file = await res
        .pipe(fs.createWriteStream(`${audioName}.mp3`))
        .on("close", function () {
          // console.log(file.path)
          // fs.rename(file.path, "./a.mp3", ()=>{})
          message
            .reply({
              content: `Sharks found the desired file!`,
              files: [`${file.path}`],
            })
            .then(() => {
              fs.unlinkSync(`${file.path}`);
            })
            .catch((err) => {
              console.log("Error during Export File " + err);
              message.reply({
                content:
                  "Sharks encountered some unknown accident and can't bring your desired file back :(",
              });
            })
            .finally(() => {
              message.channel.send("The youtube Sharks returned.");
              // console.log("downloaded file deleted")
            });
        });
    } else if (flag == 1) {
      let res = yytdl(url, { filter: "audioandvideo", format: "mp4" });
      // console.log(res)
      let now = new Date();
      let wd = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      let mn = now.getMonth() + 1;
      let d = now.getDate();
      let h = now.getHours();
      let minute = now.getMinutes();
      let sec = now.getSeconds();
      if (mn < 10) mn = "0" + (now.getMonth() + 1);
      if (d < 10) d = "0" + now.getDate();
      if (h < 10) h = "0" + now.getHours();
      if (minute < 10) minute = "0" + now.getMinutes();
      if (sec < 10) sec = "0" + now.getSeconds();

      let audioName = [now.getFullYear(), mn, d, h, minute, sec].join("");

      let file = await res
        .pipe(fs.createWriteStream(`${audioName}.mp4`))
        .on("close", function () {
          // console.log(file.path)
          // fs.rename(file.path, "./a.mp3", ()=>{})
          message
            .reply({
              content: `Sharks found the desired file!`,
              files: [`${file.path}`],
            })
            .then(() => {
              fs.unlinkSync(`${file.path}`);
            })
            .catch((err) => {
              console.log("Error during Export File " + err);
              message.reply({
                content:
                  "Sharks encountered some unknown accident and can't bring your desired file back :(",
              });
            })
            .finally(() => {
              message.channel.send("The youtube Sharks returned.");
              // console.log("downloaded file deleted")
            });
        });
    }
  }

  function fire(message) {
    //console.log(message.member.kickable)
    let target = getRandom(bullet);
    let desire = getRandom(bullet);
    bullet -= 1;
    if (target == desire) {
      //hit
      if (!message.member.kickable) {
        bullet = max_bullet;
        return message.channel.send(
          "The Russian did landed its shot, but somehow the bullet is blocked by JAX the pedophile. The revolver is reloaded.",
        );
      }
      message.member.voice.setChannel();
      message.member.timeout(30 * 1000, "Russian Shark shot him");
      bullet = max_bullet;
      return message.channel.send(
        "The Russian Shark landed its shot and <@" +
          message.author.id +
          "> was shot and kicked out of the voice channel into nearest hospital.\nShark reloaded its revolver.",
      );
    } else {
      return message.channel.send(
        "The Russian Shark landed its shot and the bullet remained inside the revolver.",
      );
    }
  }

  async function valoSch(name, id, message) {
    const user = await API.fetchUser(name, id).catch((err) => {
      console.log(err);
      return message.channel.send(
        "Sharks thinks the player may not be existed or the player's profile is private. They found nothing and returned home.",
      );
    });
    let playtime = [];
    let playagent = [];
    let winrate = [];
    let winagent = [];
    for (const [key, value] of Object.entries(user.agents())) {
      playtime.push(value["timePlayed"]);
      playagent.push(key);
      winrate.push(value["matchesWinPct"]);
      winagent.push(key);
    }
    console.log(playtime);
    console.log(playagent);
    bblSort(playtime, playagent);
    bblSort(winrate, winagent);
    try {
      const ebd = {
        color: 0x0099ff,
        title: `Player ${user.info().name}'s shark data`,
        author: {
          name: "FinderShark!",
        },
        description:
          "The Sharks works hard to found the desired account of the player",
        thumbnail: {
          url: `${user.info().avatar}`,
        },
        fields: [
          {
            name: "Current Rank",
            value: `${user.info().rank}`,
            inline: true,
          },
          {
            name: "Peak Rank",
            value: `${user.info().peakRank}`,
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: false,
          },
          {
            name: "Most played agent",
            value: `played ${winagent[0]} the best with winRate around ${winrate[0]}`,
            inline: true,
          },
          {
            name: "best agent",
            value: ``,
            inline: true,
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: false,
          },
          {
            name: "Current Act Rank status",
            value: `played ${
              user.ranked().matchesPlayed
            } ranked games\nwinrates around ${
              (user.ranked().matchesWon / user.ranked().matchesPlayed) * 100
            } %`,
            inline: true,
          },
          {
            name: "Current Act Unrated status",
            value: `played ${
              user.unrated().matchesPlayed
            } ranked games\nwinrates around ${
              (user.unrated().matchesWon / user.unrated().matchesPlayed) * 100
            } %`,
            inline: true,
          },
        ],
      };
      message.channel.send({ embeds: [ebd] });
    } catch (e) {
      message.channel.send(
        "After a long time searching, the group of Sharks gave up searching the player account.",
      );
      console.log(e);
    }
  }

  async function imageFd(message, str) {
    // gis(str, logResults);

    // function logResults(error, results) {
    //     if (error) {
    //         console.log(error + 'nmsl');
    //       }
    //     else {
    // console.log(JSON.stringify(results, null, '  '));
    //         let idx = getRandom(results.length)
    // console.log(results);
    //         message.channel.send(results[idx].url);
    //     }
    // }
    const gis = require("async-g-i-s");

    (async () => {
      try {
        const results = await gis(str);
        // console.log(results.length);
        let idx = getRandom(results.length);
        // console.log(results);
        message.channel.send(results[idx].url);
      } catch (e) {
        console.error(e);
      }
    })();
  }

  function bblSort(arr, arr1) {
    for (var i = 0; i < arr.length; i++) {
      // Last i elements are already in place
      for (var j = 0; j < arr.length - i - 1; j++) {
        // Checking if the item at present iteration
        // is greater than the next iteration
        if (arr[j] < arr[j + 1]) {
          // If the condition is true
          // then swap them
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          temp = arr1[j];
          arr1[j] = arr1[j + 1];
          arr1[j + 1] = temp;
        }
      }
    }

    // Print the sorted array
    console.log(arr);
  }

  function span(channel, word) {
    // const channel = client.channels.fetch('870838855857762307');
    channel.send("Sharks are going to spam this channel!!!");
    var Millseconds = 500;
    let sp = setInterval(function () {
      channel.send(word);
    }, Millseconds);
    // clearInterval(sp);
    setTimeout(function () {
      clearInterval(sp);
    }, 20000);
  }
  function displayRoles(message) {
    message.channel.send("loading roles in the server:");
    let roles = message.guild.roles.cache.map((role) => role.name);
    // message.guild.roles.cache.forEach(role => message.channel.send(`${role.position}`))
    // console.log(roles)
    let len = roles.length;
    if (len > 1024)
      return message.channel.send(
        "the number of roles in the server is too massive for a shark to think about.",
      );
    else if (len <= 1)
      return message.channel.send(
        "don't you really think that sharks are blind to see there is no roles in the server right?",
      );
    else {
      for (let i = 1; i < len; i++) {
        message.channel.send(`${i}. ${roles[i]}`);
      }
    }
  }

  function changeRoles(message, num) {
    message.channel.send("checking for roles in the server...");
    let roles = message.guild.roles.cache.map((role) => role.name);
    // console.log(roles)
    let len = roles.length;
    if (len > 1024)
      return message.channel.send(
        "the number of roles in the server is too massive for a shark to think about.",
      );
    else if (len <= 1)
      return message.channel.send(
        "you can't change your roles to one another if there is no other roles!",
      );
    else {
      if (num >= len)
        return message.channel.send(
          "the number of roles in the server is out of range.",
        );
      var role = message.guild.roles.cache.find(
        (role) => role.name === roles[num],
      );
      if (
        role.rawPosition == 1 ||
        role.rawPosition == 2 ||
        role.rawPosition == 0 ||
        role.rawPosition >= 6
      ) {
        return message.channel.send(
          "the role's power is beyond a shark's imagination. Permission denied!",
        );
      }
      message.member.roles.add(role);
      message.channel.send("The holy sharkmama has granted your wish!");
    }
  }
  client.login(process.env.TOKEN);
}

