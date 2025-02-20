import fs from "fs" //import fs from 'fs';
import yytdl from "ytdl-core"
import SoundBoard from "djs-soundboard"
import { PermissionsBitField } from 'discord.js';
import {
  getRandom,
  imageFd,
  DL, 
  span,
  displayRoles,
  changeRoles,
  fetchWeather
} from "./helperFunctions.js";

import {
  fetchSumByName
} from "./riotApis.js"

const food = ["總匯三明治", "法國長棍", "鐵板麵", "油條"];
const drink = ["奶茶", "紅茶", "綠茶", "可樂", "牛奶", "豆漿"];
let agent = [];
const helpCmd = [
  [1, 2, 6, 8, 9, 10, 15, 16, 22, 23, 24, 26],
  [3, 12, 13, 14, 21, 25],
  [4, 5, 7, 11, 17, 18, 19, 20],
];
export var prefix = "!";
export var readDeleted = false;
const helpThm = ["general commands", "game commands", "server commands"];
let dps = [];
let tank = [];
let sup = [];
const details = [];
let voiceSb = [];
const command = [];
let tofudir = './images';
let tofuMax = 0;
const max_bullet = 6;
var bullet = max_bullet;

fs.readdir(tofudir, (err, files) => {
  console.log(`tofu: ${files.length}`);
  tofuMax = files.length;
});
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
}

console.log(tmp.length + " commands loaded");
Agents = fs.readFileSync("textFiles/details.txt", "utf-8");
tmp = Agents.split("\n");
for (let tmpagent of tmp) {
  details.push(tmpagent)
}
export function textResponse(message, cmd, args) {
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
    for (let qi = 0; qi < args.length - 1; qi++) {
      quo += args[qi];
      quo += (qi == args.length - 2) ? "\n" : " ";
    }
    let ppl = args[args.length - 1] + "\n";
    fs.appendFileSync("textFiles/quotes.txt", quo, function(err) {
      if (err) throw err;
      console.log("quotes updated!");
    });
    fs.appendFileSync("textFiles/quotes.txt", ppl, function(err) {
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
    if (args.length == 0) {
      let nsidx = randTalkLen;
      while (nsidx >= randTalkLen - 1 || nsidx % 2 != 0) {
        nsidx = getRandom(randTalkLen);
      }
      message.reply({
        content: `#${nsidx / 2 + 1} / ${(randTalkLen) / 2}  :  ` +
          randTalk[nsidx] +
          "\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t------" +
          randTalk[nsidx + 1],
      });
    } else if (args.length == 1 && args[0] === "list") {
      let resp = ""
      let wordcnt = 0
      for (let qindex = 0; qindex < randTalkLen; qindex += 2) {
        let tmpres = "";
        tmpres += `#${qindex / 2 + 1} / ${(randTalkLen) / 2}  :  `
        tmpres += randTalk[qindex]
        tmpres += "\n\nSaid by "
        tmpres += randTalk[qindex + 1],
          tmpres += "\n--------------------------------------------\n"
        if (wordcnt + tmpres.length > 1000) {
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
    } else {
      return message.reply({
        content: `#Error Message  :  ` +
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
      // fire(message);
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
  if (cmd === command[31]) {
    if(args.length != 1) {
      return message.channel.send(`as a reminder from Sharks. \nUsage:\"check [@user]\", dear ${message.author}`)
    }
    if (message.mentions.users.size != 1) {
      return message.reply(
        "dear, you need to tag exactly one user for sharkmama to process..",
      );
    }
    let purr = message.mentions.members.first().permissionsIn(message.channel)
    console.log(purr.has(PermissionsBitField.Flags.KickMembers))

  }
  if (cmd === command[32]) {
    if (message.author.id == "528917565884334080")
      return message.channel.send(
        "Sharkmama thinks that You don't have permission to kick people",
      );
    if (args.length != 1)
      return message.channel.send(
        `as a reminder from Sharks. \nUsage:\"chuli [taggedUser]\", dear ${message.author}`,
      );

    if (args.length == 1) {
      if (!message.member.voice.channelId) {
        return message.channel.send(
          'The person you targeted is not in sniperShark\'s range!\n\nGo to a voice channel to use the command.'
        );
      }
      if (!message.member.kickable) {
          return message.channel.send(
            "unChuLiable person Q_Q",
          );
      }
      if (message.mentions.users.size != 1) {
        return message.reply(
          "dear, you need to tag only one user for sharkmama to process..",
        );
      }
      let uwuMember = message.mentions.members.first();
      uwuMember.voice.setChannel();
      uwuMember.timeout(30 * 1000, "Sniped!");
      return message.channel.send(
      "The sniperShark landed its shot and <@" +
        uwuMember.id +
        "> was shot and kicked out of the voice channel into nearest hospital."
      )
    } 
  }
  return
}
