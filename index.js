import DiscordJS from "discord.js"
import HenrikDevValorantAPI from '@meibot/unofficial-valorant-api'
const VAPI = new HenrikDevValorantAPI();
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import {
  Attachment,
  IntentsBitField,
  GatewayIntentBits,
} from "discord.js"
import { EmbedBuilder } from "discord.js"
import dotenv from "dotenv"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import { LolApi, Constants } from "twisted"
import yytdl from "ytdl-core"
import SoundBoard from "djs-soundboard"
import fetch from "node-fetch"
const riotKey = "RGAPI-812f9f96-a057-479f-a141-0c128b511aca"
const sp = "%20"

import gis from "g-i-s" //import gis from 'g-i-s';
import fs from "fs" //import fs from 'fs';
import { API } from "vandal.js"
import { Player } from "discord-player"
import download from "downloadjs"

import ytdl from "play-dl"
dotenv.config();

const LOAD_SLASH = process.argv[2] == "load";
const CLIENT_ID = "1029392717186355240";
const GUILD_ID = "457174952731475987";
const selfID = "1029392717186355240";
let voiceSb = [];

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
let agent = [];

const command = [];
const DMcmd = ["dsend"];
const DMdes = ["send message to Some channel"];

const helpCmd = [
  [1, 2, 6, 8, 9, 10, 15, 16, 22, 23, 24, 26],
  [3, 12, 13, 14, 21, 25],
  [4, 5, 7, 11, 17, 18, 19, 20],
];
const helpThm = ["general commands", "game commands", "server commands"];
let dps = [];
let tank = [];
let sup = [];
const details = [];

function getRandom(x) {
  return Math.floor(Math.random() * x);
}

function leftToEight() {
  var d = new Date();
  return -d + d.setHours(8, 0, 0, 0);
}


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
let tofudir = './images';
let tofuMax = 0;
fs.readdir(tofudir, (err, files) => {
  console.log(`tofu: ${files.length}`);
  tofuMax = files.length;
});

client.slashcommands = new DiscordJS.Collection();
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});


let commands = [];

const slashFiles = fs
  .readdirSync("./slash")
  .filter((file) => file.endsWith(".cjs"));
for (const file of slashFiles) {
  const slashcmd = require(`./slash/${file}`);
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
    var Agents = fs.readFileSync("textFiles/agent.txt", "utf-8");
    var tmp = Agents.split("\n");
    for (let tmpagent of tmp) {
      agent.push(tmpagent)
    }
    Agents = fs.readFileSync("textFiles/dps.txt", "utf-8");
    tmp = Agents.split("\n");
    for (let tmpagent of tmp) {
      dps.push(tmpagent)
    }
    Agents = fs.readFileSync("textFiles/tank.txt", "utf-8");
    tmp = Agents.split("\n");
    for (let tmpagent of tmp) {
      tank.push(tmpagent)
    }
    Agents = fs.readFileSync("textFiles/sup.txt", "utf-8");
    tmp = Agents.split("\n");
    for (let tmpagent of tmp) {
      sup.push(tmpagent)
    }

    Agents = fs.readFileSync("textFiles/voiceSb.txt", "utf-8");
    tmp = Agents.split("\n");
    for (let tmpagent of tmp) {
      voiceSb.push(tmpagent)
    }

    Agents = fs.readFileSync("textFiles/command.txt", "utf-8");
    tmp = Agents.split("\n");
    for (let tmpagent of tmp) {
      command.push(tmpagent)
      // console.log(tmpagent)
    }
    Agents = fs.readFileSync("textFiles/details.txt", "utf-8");
    tmp = Agents.split("\n");
    for (let tmpagent of tmp) {
      details.push(tmpagent)
    }
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
    // if (!message.guild && message.author.id != "508461238444097614") {
    //   return message.channel.send(
    //     "The shark can't recognize you! DM commands locked!",
    //   );
    // }

    if(!message.guild) {
      const args = message.content.slice(prefix.length).trim().split(" ");
      const cmd = args.shift().toLowerCase();
      if (message.author.id === selfID) {
        console.log("talk to self");
      } else {
        console.log("DMing")//available: {send}
        if(cmd === "send") {
          if(args.length != 3) {
            return message.channel.send("Dear DM user, Usage: send [message] [guildID] [channelID]")
          }
          let g = args[1]
          let c = args[2]
          // console.log(g)
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
        console.log("talk to self");
      } else {
        console.log(cmd);
        if (cmd === command[0]) {
          message.reply({
            content: "mama",
          });
          message.channel.send("Greeting from sharkmama ^^");
        }

        if (cmd === command[1]) {
          if (args.length != 1) {
            let pageList = "available pages listed:\n"
            for (let i = 0; i < helpThm.length; i++) {
              pageList += `${i} - ${helpThm[i]}\n`
            }
            return message.channel.send(
              `as a reminder from Sharks. \nUsage:\"help [page]\", dear ${message.author}\n${pageList}`,
            );
          }

          if (!Number.isInteger(Number(args[0])) || Number(args[0]) >= helpThm.length || Number(args[0]) < 0) {
            return message.channel.send("Shark! That's the wrong number!")
          }

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
              `Dear ${message.author}, Sharkmama want to watch you finishing your homework and stop playing Valorant.`,
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
          if (args.length < 2)
            return message.channel.send(
              `as a reminder from Sharks. \nUsage:\"add [new quotes(space are available)] [who said that]\", dear ${message.author}`,
            );
          let quo = ""
          for(let qi = 0; qi < args.length - 1; qi++) {
            quo += args[qi];
            quo += (qi == args.length - 2)? "\n" : " ";
          }
          let ppl = args[args.length - 1] + "\n";
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
          var randTalkLen = randTalk.length - 1;
          // console.log(randTalkLen)
          if(args.length == 0) {
            let nsidx = randTalkLen;
            while (nsidx >= randTalkLen - 1 || nsidx % 2 != 0) {
              nsidx = getRandom(randTalkLen);
            }
            message.reply({
              content:
                `#${nsidx / 2 + 1} / ${(randTalkLen) / 2}  :  ` +
                randTalk[nsidx] +
                "\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t------" +
                randTalk[nsidx + 1],
            });
          }
          else if(args.length == 1 && args[0] === "list"){
            let resp = ""
            let wordcnt = 0
            for (let qindex = 0; qindex < randTalkLen; qindex+=2) {
              let tmpres = "";
              tmpres += `#${qindex / 2 + 1} / ${(randTalkLen) / 2}  :  ` 
              tmpres += randTalk[qindex] 
              tmpres += "\n\nSaid by " 
              tmpres += randTalk[qindex + 1],
              tmpres += "\n--------------------------------------------\n"
              if(wordcnt + tmpres.length > 1000) {
                message.channel.send(resp)
                resp = ""
                wordcnt = tmpres.length
                resp += tmpres
              } else {
                wordcnt += tmpres.length
                resp += tmpres
              }
            } 
            message.channel.send(resp).catch(() => {
              message.channel.send("Quote book is too heavy for a shark to carry. So it gave up :D")
            })
          }
          else {
            return message.reply({
              content:
                `#Error Message  :  ` +
                "My dear child, The quote command's usage is !quote [empty/list]. leave the only argument empty to use the command or list to list all the quotes." +
                "\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t------" +
                "SharkMama",
            })
          }
        }

        if (cmd === command[11]) {
          if (message.mentions.users.size != 1) {
            return message.reply(
              'a little reminder of kicking someone out from Sharks:\nUsage: "kick [tag user]"',
            );
          }
          let taggedUser = message.mentions.users.first();
          message.channel.send(
            `Sharkmama is going to kick: ${taggedUser.username}`,
          );

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
          const gd = message.guild;
          const usr = gd.members.kick(taggedUser.id);
          console.log(usr);
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

          avatarList.forEach((avatar) => message.channel.send(`${avatar}`));
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
          if (args.length != 1) {
            let retMes = `as a reminder from Sharks. \nUsage:\"sb [sounds]\", dear ${message.author}\navailable sounds:\n**empty** - list all the 108 sounds available\n`
            for(let i = 0; i<= 84; i++) {
              retMes += `**${i+1}. ${voiceSb[i]}**\n`
            }

            return message.reply({
              content: retMes
            });
          }
          if (!message.member.voice.channel) {
            return message.channel.send(
              "Dear, be at least in one voice channel to use call Sharkmama.",
            );
          }
          let sound = new SoundBoard();
          let channel = message.member.voice.channel; // required*
          let sb = args[0];
          sound
            .play(channel, voiceSb[Number(sb)-1])
            .then(() => {
              message.channel.send("Sharks has made some noises!");
            })
            .catch(() => {
              message.channel.send("Welp, Sharks can't make this kind of noise.");
            }); //Sound
        }
      }
        if(cmd === command[25]) {
          if(args.length <= 1) {
            return message.channel.send(`as a reminder from Sharks. \nUsage:\"lol [names in LOL] [tag in RIOT]\", dear ${message.author}`)
          }
          let name = "";
          for(let ni = 0; ni < args.length-1; ni++) {
            name += `${args[ni]}${(ni == args.length-2)? "" : " "}`;
          }
          let tag = args[args.length - 1];
          fetchSumByName(message, name, tag)
          message.channel.send("Shark is coming...")
        }
        if(cmd === command[26]) {
          let tofuIndex = getRandom(tofuMax)+1;
          message.reply({
            content: `Here's the one and only <@554308339799031818> (${tofuIndex} / ${tofuMax})`,
            files: [`./images/tofu${tofuIndex}.jpg`],
          })
        }

        if(cmd === command[27]) {
          if(args.length != 1) {
            return message.reply({
              content: `as a reminder from Sharks. \nUsage: \"weather [city]\", dear ${message.author}`
            })
          }
          message.channel.send("The weather sharks are rushing toward the desired location...");
          var english = /^[A-Za-z0-9]*$/;
          let ct = args[0]
          if(english.test(args[0]))
            ct += ""//", Taiwan"
          // console.log(ct)
          fetchWeather(ct, message) 
        }

        if(cmd === command[28]) {
          if(args.length < 1) {
            return message.channel.send(`as a reminder from Sharks. \nUsage:\"image [Prompt in sentense]\", dear ${message.author}`)
          }
          let prom = args.join(' ')
          message.channel.send("The AI Sharks are drawing something...");
          artificialIdiot(message, prom)
        }

        if(cmd === command[29]) {
          if(args.length <= 1) {
            return message.channel.send(`as a reminder from Sharks. \nUsage:\"lolMatch [names in LOL] [tag in RIOT]\", dear ${message.author}`)
          }
          let name = "";
          for(let ni = 0; ni < args.length-1; ni++) {
            name += `${args[ni]}${(ni == args.length-2)? "" : " "}`;
          }
          let tag = args[args.length - 1];
          fetchOneMatch(message, name, tag, 0);
          message.channel.send("Sharks will be back...")
        }

        if(cmd === command[30]) {
          if(args.length <= 1) {
            return message.channel.send(`as a reminder from Sharks. \nUsage:\"lolCurr [names in LOL] [tag in RIOT]\", dear ${message.author}`)
          }
          let name = "";
          for(let ni = 0; ni < args.length-1; ni++) {
            name += `${args[ni]}${(ni == args.length-2)? "" : " "}`;
          }
          let tag = args[args.length - 1];
          findCurrMatch(message, name, tag);
          message.channel.send("Sharks are fetching...");

        }
      }
  });

  async function artificialIdiot(message, prom) {
    const AI = require("stable-diffusion-cjs")

    await AI.generate(prom, async (result) => {
      if (result.error) {
          console.log(result.error)
          return message.channel.send("The AI Sharks ran out of idea and gave up drawing.");
      }
      try {
          for (let i = 0; i < result.results.length; i++) {
              let data = result.results[i].split(",")[1]
              const buffer = Buffer.from(data, "base64")
              const filename = `image_${i + 1}.png`
              fs.writeFileSync(filename, buffer)
              message
                .reply({
                  content: `AI Shark drew you this! It's No. ${i + 1} result.`,
                  files: [`${filename}`],
                })
                .then(() => {
                  fs.unlinkSync(`${filename}`);
                })
                .catch((err) => {
                  console.log("Error during Export File " + err);
                  message.reply({
                    content:
                      "Sharks encountered some unknown accident and can't draw you something!",
                  });
                })
          }
          message.channel.send("The AI Sharks returned.");
      } catch (e) {
          console.log(e)
      }
    })
  }

  async function fetchWeather(city, message) {
    var weather = require('weather-js');
    var response
    await weather.find({search: city, degreeType: 'C'}, function(err, result) {
      if(err) {
        console.log(err);
        return message.channel.send("It may be a city, but the sharks got ambushed by PykeShark on the road.\nPykeShark: Pyke kills, Pyke kills, Pyke kills, Pyke...")
      }
      response = JSON.parse(JSON.stringify(result, null, 2))
      // console.log(response.length)

      if (response.length == 0) {
        return message.channel.send("It's a city that no sharks have ever reached.\nLuxShark: Ooh, I've never been here before.")
      }
      var days = ""
      response[0].forecast.forEach((day) => {
        days += `
        ${day.date} (${day.shortday})\n
        probability of precipitation: ${day.precip}%\n
        temperature: (${day.low} ~ ${day.high} degree celsius)\n
        sky will be: ${day.skytextday}\n
        \n-\n`  
      })
      try {
        const ebd = {
          color: 0x0099ff,
          title: `**${response[0].location.name}**[${response[0].location.long}, ${response[0].location.lat}](GMT ${response[0].location.timezone})'s weather data`,
          author: {
            name: "WeatherShark!",
          },
          description:
            "The Sharks works hard to found the desired weather data",
          thumbnail: {
            url: `${response[0].current.imageUrl}`,
          },
          fields: [
            {
              name: "Current Weather",
              value: `temperature: ${response[0].current.temperature} degree celsius.\n
              feels like ${response[0].current.feelslike} degree celsius.\n
              sky: ${response[0].current.skytext}\n
              observe time: ${response[0].current.observationtime}\n
              humidity: ${response[0].current.humidity} %\n
              wind: ${response[0].current.winddisplay}`,
            },
            {
              name: "\u200b",
              value: "\u200b",
              inline: false,
            },
            {
              name: `forecast`,
              value: `${days}`,
              inline: true,
            }
          ],
        };
        return message.channel.send({ embeds: [ebd] });
      } catch (e) {
        message.channel.send(
          "Sharks got the weather infos! But they are too tired to tell you. Failed to load infos.",
        );
        console.log(e);
      }
    });  
  }

  function analMatch(matches, m) {
    let indexArr = ['TOP', 'MIDDLE', 'BOTTOM', 'SUPPORT', 'JUNGLE']
    let index = indexArr.indexOf(m.individualPosition)
    if (m.individualPosition == "UTILITY") index = 3;
    if (m.individualPosition == "Invalid") matches[21]++; //ARAM probably
    if (m.individualPosition == "Invalid" || index == -1) return;
    
    matches[index] ++
    if(m.win) matches[index+5] ++
    matches[index+10] += m.challenges.kda
    matches[index+15] += m.visionScore
    matches[20] += m.damageDealtToObjectives
  }

  async function findMatch(id, cnt, message) {
    console.log("fetching...")
    const link = `https://sea.api.riotgames.com/lol/match/v5/matches/by-puuid/${id}/ids?start=0&count=${cnt}&api_key=${riotKey}`
    const response = await fetch(link).catch((err) => {
      message.channel.send("Sharks had encountered unknown obstacles reaching the desired player in TW server!")
      throw(err)
    })
    const data = await response.json()
    let arr = []
    for (let i = 0;i<Math.min(data.length, cnt); i++) {
      let stuff = await fetchMatch(data[i], message, id) 
      arr.push(stuff);
    }
    return arr
  }

  async function fetchMatch(id, message, pid) {
    const link = `https://sea.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${riotKey}`
    const response = await fetch(link).catch((err) => {
      message.channel.send("Sharks had encountered unknown obstacles reaching the desired player in TW server!")
      throw(err)
    })
    const data = await response.json()
    let index = data.metadata.participants.indexOf(pid)
    return data.info.participants[index]
  }

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  async function reviewMatch(message, match) {
    console.log(match)
    const link = `https://ddragon.leagueoflegends.com/cdn/14.4.1/data/zh_TW/item.json`
    const response = await fetch(link).catch((err) => {
      message.channel.send("Sharks had encountered unknown obstacles reaching the item list in TW server!")
      throw(err)
    })
    const data = await response.json()
    let itemIds = [match.item0.toString(), match.item1.toString(), match.item2.toString(), match.item3.toString(), match.item4.toString(), match.item5.toString(), match.item6.toString()]
    let items = "[";
    for (let itemIdx = 0; itemIdx < 7; itemIdx++) {
      // console.log(data[itemIds[itemIdx]])
      items += (data.data[itemIds[itemIdx]])? data.data[itemIds[itemIdx]].name : "**Empty**";
      items += (itemIdx == 6)? ']' : ', '
    }
    
    let indexArr = ['TOP', 'MIDDLE', 'BOTTOM', 'SUPPORT', 'JUNGLE']
    let index1 = ['Damage to enemy', 'Damage to enemy', 'Damage to enemy', 'CC time', 'Drake Secured']
    let index2 = ['Turrets', 'Huge kills', 'CS', 'Vision score',  'jungle CS Before 10Mins']
    let index3 = ['Turret plates taken', 'Damage Percentage', 'max CS advantage in lane', 'Heals On Teammates',  'team Baron Kills']
    let index4 = ['max Level Lead Opponent', 'max Level Lead Opponent', 'max Level Lead Opponent', 'Damage Shielded On Teammates',  'max jungle CS advantage']
    let index5 = ['killingSprees', 'killingSprees', 'killingSprees', 'damage absorbed', 'Elder drakes taken']
    let index = indexArr.indexOf(match.individualPosition)
    if (match.individualPosition == "UTILITY") index = 3;
    if (match.individualPosition == "Invalid") {
      return message.channel.send("You just played something that is not reviewable like ARAM! sharks left.");
    }
    try {
      const ebd = {
        color: 0x0099ff,
        title: `Player ${match.summonerName}'s last match!`,
        author: {
          name: "ReviewerShark!",
        },
        description:
          "The Shark judges are gonna deliver your judgment!",
        thumbnail: {
          url: `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${match.championName}.png`
        },
        fields: [
          {
            name: "Champion, Lane and KDA",
            value: `**${match.championName}** ***${indexArr[index]}*** (${match.kills}/${match.deaths}/${match.assists})`,
          },
          {
            name: "Surrendered?",
            value: ((match.gameEndedInSurrender || match.gameEndedInEarlySurrender) && !match.win)? "Your team yielded :(" : "You will not yield!",
            inline: true,
          }, 
          {
            name: `${index2[index]}`,
            value: 
            (index == 0)? `brought down ${match.turretTakedowns} turret(s), total ${match.damageDealtToBuildings} damage!` : 
            (index == 1)? `${match.largestMultiKill}` :
            (index == 2)? `${match.totalMinionsKilled}` :
            (index == 3)? `${match.visionScore},\ndiffered to enemy team's by ${financial(match.challenges.visionScoreAdvantageLaneOpponent*100)}%!`: 
            `${match.challenges.jungleCsBefore10Minutes}`,
            inline: true,
          },
          {
            name: `${index1[index]}`,
            value: (index < 3)? `${match.totalDamageDealtToChampions}` : 
            (index == 3)? `${match.timeCCingOthers} (s)` : 
            `${match.dragonKills}`,
            inline: true,
          },
          {
            name: `${index3[index]}`,
            value: 
            (index == 0)? `had ${match.challenges.turretPlatesTaken} plates` : 
            (index == 1)? `the mid player dealt ${financial(match.challenges.teamDamagePercentage*100)}% damage for zir team` :
            (index == 2)? `${match.challenges.maxCsAdvantageOnLaneOpponent}` :
            (index == 3)? `${match.totalHeal},\n ${match.totalHealsOnTeammates} of it is spent on teammates`: 
            `${match.teamBaronKills}`,
            inline: true,
          },
          {
            name: `${index4[index]}`,
            value: (index < 3)? `${match.challenges.maxLevelLeadLaneOpponent} level(s)` : 
            (index == 3)? `${match.totalDamageShieldedOnTeammates}` : 
            `${match.challenges.moreEnemyJungleThanOpponent}`,
            inline: true,
          },
          {
            name: `${index5[index]}`,
            value: (index < 3)? `The player had max killingSprees of ${match.killingSprees}, bountyLevel went up to level ${match.bountyLevel}` : 
            (index == 3)? `The player had ${financial(match.challenges.damageTakenOnTeamPercentage*100)}% of damage on zir team` : 
            `lead the team to take ${match.challenges.teamElderDragonKills} elder drake(s)`,
            inline: false,
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: false,
          },
          {
            name: `EndGame items`,
            value: items
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

  async function fetchOneMatch(message, name, tag, index) {
    const link = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${riotKey}`
    const response = await fetch(link).catch(() => {
      message.channel.send("Sharks had encountered unknown obstacles reaching the desired player in TW server!")
    })
    const data = await response.json();
    let matches = await findMatch(data.puuid, index+1, message);
    reviewMatch(message, matches[index]);
  }

  async function findMastery(id, message) {
    const link = `https://tw2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${id}?api_key=${riotKey}`
    const response = await fetch(link).catch((err) => {
      message.channel.send("Sharks had encountered unknown obstacles reaching the desired player in TW server!")
      throw(err)
    })
    const data = await response.json()
    let arr = []
    for (let i = 0;i<Math.min(5, data.length); i++) {
      arr.push(data[i])
    }

    return arr
  }

  function concatMatch(m, cnt) {
    let str = ""
    let lanes = ['TOP', 'MIDDLE', 'BOTTOM', 'SUPPORT', 'JUNGLE']
    for (let i = 0;i<5;i++) {
      str += `**${lanes[i]} - **`
      let a = 100*m[i+5]/m[i]
      let b = m[i+10]/m[i]
      let c = m[i+15]/m[i]
      str += (m[i] == 0)? "No records\n" : `winrate: ${a.toFixed(2)}% (played ${lanes[i]} ${m[i]} time(s) recently) .\nAverage KDA: ${b.toFixed(2)} | average visionScore: ${c.toFixed(2)}\n`
    }
    console.log(m[21])
    if(m[21] > cnt/2) {
      str += `Reviewer shark: _the player might be a ARAM player since half the match shark fetched (${cnt} matches) are not regular matches._`
    }
    return str
  }

  async function fetchRank(message, name, rk) {
    const link = `https://tw2.api.riotgames.com/lol/league/v4/entries/by-summoner/${name}?api_key=${riotKey}`
    const response = await fetch(link).catch(() => {
      message.channel.send("Sharks had encountered unknown obstacles reaching the desired player in TW server!")
    })
    const data = await response.json();
    if(data.length == 1) {
      if(data[0].queueType == "RANKED_SOLO_5x5") {
        rk[0] = data[0].tier + " " + data[0].rank;
      } else {
        rk[1] = data[0].tier + " " + data[0].rank;
      }
    } else if(data.length == 2) {
        rk[0] = data[0].tier + " " + data[0].rank;
        rk[1] = data[1].tier + " " + data[1].rank;
    }
  }

  async function fetchOldRiot(message, puuid) {
    const link = `https://tw2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${riotKey}`
    const response = await fetch(link).catch(() => {
      message.channel.send("Sharks had encountered unknown obstacles reaching the desired player in TW server!")
    })
    const data = await response.json();
    return data;  
  }


  async function fetchSumByName(message, name, tag) {
    const link = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${riotKey}`
    const response = await fetch(link).catch(() => {
      message.channel.send("Sharks had encountered unknown obstacles reaching the desired player in TW server!")
    })
    const datata = await response.json();
    let besties = await findMastery(datata.puuid, message)

    let rks = ["", ""];//solo, flex
    const data = await fetchOldRiot(message, datata.puuid);
    await fetchRank(message, data.id, rks);

    let mastery = ""
    for (let i = 0;i<besties.length;i++) {
      mastery += `${i+1} - level ${besties[i].championLevel} ${championID2name(besties[i].championId)} with Points at ${besties[i].championPoints}\n`
      if(besties[i].championLevel == 5 || besties[i].championLevel == 6) {
        mastery += `Currently has ${besties[i].tokensEarned} tokens on this champion\n`
      }
    }

    let matches = await findMatch(data.puuid, 15, message)
    // console.log(matches)
    let wins = 0
    let anal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//numOfLanes(5), winsOfLanes(5), KDAs(5), visionPoint(5), averageDamage(1), invalidCounts(1)
    for (let i = 0;i<matches.length;i++) {
      if (matches[i].win) wins ++
      analMatch(anal, matches[i])
    }
    let anamatch = ""
    anamatch += concatMatch(anal, 15)


    try {
      const ebd = {
        color: 0x0099ff,
        title: `Player ${name}'s shark data`,
        author: {
          name: "FinderShark!",
        },
        description:
          "The Sharks works hard to found the desired account of the player",
        thumbnail: {
          url: `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/profileicon/${data.profileIconId}.png`,
        },
        fields: [
          {
            name: "Current SOLO Rank",
            value: (rks[0].length == 0)? `unknown` : rks[0],
            inline: true,
          },
          {
            name: "Current FLEX Rank",
            value: (rks[1].length == 0)? `unknown` : rks[1],
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: false,
          },
          {
            name: `Top ${besties.length} most played champion(s)`,
            value: `${mastery}`,
            inline: true,
          },
          {
            name: "Recent Performance",
            value: `${anamatch}`,
            inline: true,
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: false,
          }
        ],
      };
      message.channel.send({ embeds: [ebd] });
    } catch (e) {
      message.channel.send(
        "After a long time searching, the group of Sharks gave up searching the player account.",
      );
      console.log(e);
    }

    // console.log(data.puuid)
  }

  async function nameTag2Puuid(name, tag) {
    const link = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${riotKey}`
    const response = await fetch(link).catch((err) => {  
      console.log(err)
      throw(err);
    })
    const data = await response.json();
    return data.puuid;
  }

  async function puuid2Id(puuid) {
    const link = `https://tw2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${riotKey}`
    const response = await fetch(link).catch((err) => {  
      console.log(err)
      throw(err);
    })
    const data = await response.json();
    return data.id;
  }

  async function puuid2NameTag(player) {
    const link = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${player.puuid}?api_key=${riotKey}`
    const response = await fetch(link).catch((err) => {  
      console.log(err)
      throw(err);
    })
    const data = await response.json();
    let retStr = `(playing ${championID2name(player.championId)})!lol ${data.gameName} ${data.tagLine}`
    return retStr;
  }


  async function findCurrMatch(message, name, tag) {
    const puuid = await nameTag2Puuid(name, tag).catch(() => {
      return message.channel.send("Sharks can't find the player");
    })
    console.log(puuid)
    const summid = await puuid2Id(puuid).catch(() => {
      return message.channel.send("Sharks can't find the player");
    })
;
    const link = `https://tw2.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summid}?api_key=${riotKey}`
    const response = await fetch(link).catch((err) => {  
      console.log(err)
      return message.channel.send("The player may not be playing any match now.");
    })
    if(response.status == 404) {
      return message.channel.send("The player may not be playing any match now.");
    } else if (response.status != 200) {
      console.log(response)
      return message.channel.send("Sharks may have encounterd some obstacles.")
    }
    const data = await response.json();
    console.log(data)
    for (let pi = 0; pi < data.participants.length; pi++) {
      console.log(data.participants[pi])
      if(data.participants[pi].bot) continue;
      let retMsg = await puuid2NameTag(data.participants[pi]);
      message.channel.send(retMsg);
    }
  }

  function championID2name(id) {
    const list = require("./textFiles/championID.json")
    return list[id]
  }

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
    let empty = "Unknown"
    message.channel.send("function in update")
    const user = await VAPI.getAccount({
      name: name,
      tag: id,
    }).catch((err) => {
      console.log(err);
      return message.channel.send("Sharks thinks the player may not be existed or the player's profile is private. They found nothing and returned home.",
      );
    });

    const mmr_data = await VAPI.getMMR({
      version: 'v2',
      region: 'ap',
      name: name,
      tag: id,
    });
    // let playtime = [];
    // let playagent = [];
    // let winrate = [];
    // let winagent = [];
    // for (const [key, value] of Object.entries(user.agents())) {
    //   playtime.push(value["timePlayed"]);
    //   playagent.push(key);
    //   winrate.push(value["matchesWinPct"]);
    //   winagent.push(key);
    // }
    // console.log(playtime);
    // console.log(playagent);
    // bblSort(playtime, playagent);
    // bblSort(winrate, winagent);
    try {
      const ebd = {
        color: 0x0099ff,
        title: `Player ${user.data.name}#${user.data.tag}'s shark data`,
        author: {
          name: "FinderShark!",
        },
        description:
          "The Sharks works hard to found the desired account of the player",
        thumbnail: {
          url: `${user.data.card.large}`,
        },
        fields: [
          {
            name: "Current Rank",
            value: `${mmr_data.data.current_data.currenttierpatched|| empty}\nGained ${mmr_data.data.current_data.mmr_change_to_last_game || empty} rp last game.`,
            inline: true,
          },
          {
            name: "Highest Rank",
            value: `${mmr_data.data.highest_rank.patched_tier|| empty}\n`,
            inline: true,
          },

          {
            name: "Elo",
            value: `${mmr_data.data.current_data.elo}`,
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: false,
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

