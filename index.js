//import DiscordJS, { Attachment, IntentsBitField } from 'discord.js'
const DiscordJS = require('discord.js')
const { Attachment, IntentsBitField, GatewayIntentBits } = require('discord.js')
const dotenv = require('dotenv')
//import dotenv from 'dotenv'
const {REST} = require('@discordjs/rest')
//import {REST} from '@discordjs/rest'
//import {Routes} from 'discord-api-types/v10'
const {Routes} = require('discord-api-types/v10')
//import {Player} from 'discord-player'
//import Discord from 'discord.io';
const gis = require('g-i-s')//import gis from 'g-i-s';
const fs = require('fs')//import fs from 'fs';
const { Player } = require("discord-player")
//const ytdl = require('ytdl-core-discord');
//import ytdl from 'ytdl-core';
dotenv.config()

const LOAD_SLASH = process.argv[2] == "load"

const CLIENT_ID = "1029392717186355240"
const GUILD_ID = "457174952731475987"



const selfID = '1029392717186355240'
var prefix = '!';
var readDeleted = false;
const food = ['總匯三明治', '法國長棍', '鐵板麵', '油條']
const drink = ['奶茶', '紅茶', '綠茶', '可樂', '牛奶', '豆漿']
const agent = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Jett', 'Kay/O', 'Killjoy', 'Neon', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru', 'horbor']

const command = ['greet', 'help', 'breakfast', 'agent', 'watchdel', 'editprefix', 'rat', 'checksvr', 'download', 'shark', 'quote', 'kick', 'dps', 'tank', 'heal', 'avater', 'search', 'roll']
const dps = ['Ashe', 'Bastion', 'Cassidy', 'Echo', 'Genji', 'Hanzo', 'Junkrat', 'Mei', 'Pharah', 'Reaper', 'Sojourn', 'Soldier: 76', 'Sombra', 'Symmetra', 'Tornjörn', 'Tracer', 'Widowmaker']
const tank = ['D.va', 'Junker Queen', 'Sigma', 'Ramattra', 'Orisa', 'Reinhardt', 'Roadhog', 'Winston', 'Zarya', 'Wrecking ball', 'Doomfist']
const sup = ['Ana', 'Baptiste', 'Brigitte', 'Kiriko', 'Lúcio', 'Mercy', 'Moira', 'Zenyatta']
const details = ['to call sharkmama',
                 'to get command list',
                 'to ask for today\'s Sharkmama Recommended Dishes',
                 'to ask what agent to play in Valorant',
                 `to change permission of reading deleted message.(current: ${readDeleted})`,
                 `change current prefix.(current: ${prefix})?`,
                 'Rats',
                 'check server status?',
                 'download video?',
                 'shark',
                 'to get random nonsense said by someone you may know.',
                 'to annoy sharkmama and get kicked?',
                'to ask sharkmama what dps to play in Overwatch',
                'to ask sharkmama what tank to play in Overwatch',
                'to ask sharkmama what healer to play in Overwatch',
                'to ask sharkmama to give you the avater of the tagged users (will be yourself if no tags)',
                'to ask the Holy sharkmama for some images.', 
								'get lucky number from Sharkmama!']

function getRandom(x){
    return Math.floor(Math.random()*x);
};


const client = new DiscordJS.Client({
  intents: [IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent, 
            IntentsBitField.Flags.GuildVoiceStates,
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildVoiceStates
            ],
})

client.slashcommands = new DiscordJS.Collection()
client.player = new Player(client, {
    ytdlOptions : {
        quality: "highestaudio", 
        highWaterMark: 1 << 25
    }
})

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for(const file of slashFiles) {
  const slashcmd = require(`./slash/${file}`)
  console.log(file)
  client.slashcommands.set(slashcmd.data.name, slashcmd)

  if(LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
  const rest = new REST({version: "10"}).setToken(process.env.TOKEN)
  console.log("Deploying slash commands")
  rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
  .then(() => {
    console.log("suscess")
    process.exit(0)
  })
  .catch((err) => {
    if(err){
      console.log(err)
      process.exit(1)
    }
  })
}
else {

client.on('ready', () => {
    console.log('The shark is ready')
    const channel = client.channels.fetch('870838855857762307');
    //console.log(channel)

    const guildID = '457174952731475987';
    const guild = client.guilds.cache.get(guildID);
    /*
    let slhcmd

    if(guild) {
        slhcmd = guild.commands
    }
    else {
        slhcmd = client.application?.commands
    }

    slhcmd?.create({
        name: 'shark',
        description: 'replies with mama',
    })
    slhcmd?.create({
        name: 'add',
        description: 'add two numbers',
        options: [
            {
                name: 'num1',
                description: 'first number',
                required: 'true',
                type: DiscordJS.ApplicationCommandOptionType.Number
            },
            {
                name: 'num2',
                description: 'second number',
                required: 'true',
                type: DiscordJS.ApplicationCommandOptionType.Number
            }]
    })
    */
})

client.on('interactionCreate', async (interaction) => {
  async function handleCommand() {
    if(!interaction.isCommand()) {
        return
    }

    const slashcmd = client.slashcommands.get(interaction.commandName)
    if(!slashcmd) interaction.reply("Not valid slashcmd")

    await interaction.deferReply()
    await slashcmd.run({client, interaction})
  }
  handleCommand()
    

    const { commandName, options } = interaction

    /*
    if(commandName === 'shark') {
        interaction.reply({
            content: 'mama',
            ephemeral: true,
        })
    }
    else if(commandName === 'add') {
        const num1 = options.getNumber('num1') || 0
        const num2 = options.getNumber('num2') || 0

    await interaction.deferReply({
        ephemeral: true,
    })

    await new Promise(resolve => setTimeout(resolve, 5000))

    await interaction.editReply({
            content: `sum is ${num1 + num2}`,
        })
    }
    */
})

client.on('messageDelete', (message) => {
                if(message.author.bot) return;
    if(readDeleted) {
        let c = message.channel
        c.send('Beware of what you say, the holy Sharkmama has caught you deleting what you said!:\n\n' +
        `${message.author} has said: __**${message.content}**__\n, and tried so hard to delete it!`)
    }
    else {
        let c = message.channel
        c.send('oops, looks like\n' +
        `${message.author} has deleted a message but sharkmama does not have the permission to see it.`)
    }
})

client.on('messageCreate', (message) => {
                if (((!message.content.startsWith('！') && prefix === '!') && !message.content.startsWith(prefix)) || message.author.bot) return;
        if(message.content.startsWith('！') && prefix === '!') {
                message.channel.send('you used chinese prefix which seems to be a typo.\n');
        }
                const args = message.content.slice(prefix.length).trim().split(' ');
                const cmd = args.shift().toLowerCase();
    console.log(args)
    if(message.author.id === selfID) {
        console.log("talk to self")
    }
    else {
        console.log("talk to other")
        //let tmpcmd = message.content.toString();
        //let cnt = 0
        //let cmd = '';

        /*for(let i = 0;i<tmpcmd.length;i++) {
            if(tmpcmd[i] == '！') {


                if(cnt == 0) {
                    message.channel.send('you used chinese prefix which seems to be a typo.\n');

                }
                cmd += '!';
                cnt++
            }
            else {
                cmd += tmpcmd[i]
            }

        }
        cmd.toLowerCase()
        console.log(cmd)*/

        if (cmd === command[0]) {
            message.reply({
                content: 'mama',
                //ephemeral: true,
            })
            message.channel.send('Greeting from sharkmama ^^')
            //console.log(message.channel);
        }

        if (cmd === (command[1])) {
            let cmdList = 'shark commands listed:\n(the ? sign at the end indecates unreleased commands)\ngreet - **to call sharkmama**\n';
            for(let i = 1;i<command.length;i++) {
                cmdList += prefix;
                cmdList += `${command[i]} - **${details[i]}**\n`;
            }
            message.reply({
                content: cmdList,
            })
            //console.log(message.channel);
        }

        if (cmd === (command[2])) {
            let f = getRandom(food.length)
            let d = getRandom(drink.length)
            message.reply({
                content: `Dear ${message.author}, hope you enjoy today's Sharkmama Recommended Dishes: (${food[f]}, ${drink[d]})`
            })
        }

        if (cmd === (command[3])) {
            let p = getRandom(agent.length)
            message.reply({
                content: `Dear ${message.author}, Sharkmama want to watch you play *${agent[p]}* in Valorant`
            })

        }

        if (cmd === (command[4])) {
            readDeleted = !readDeleted;
            message.reply({
                content: `Sharkmama ${(readDeleted)? 'can' : 'can\'t'} read deleted message and tell everyone else!`
            })
        }

        if (cmd === (command[5])) {
                                        if(args.length != 1) return message.channel.send(`as a reminder from Sharks. \nUsage:\"editprefix [new prefix]\", dear ${message.author}`);
          prefix = args[0];
                                        message.reply({
                content: `current prefix has been changed into ${prefix}.`
            })
                                }

        if (cmd === (command[6])) {
            imageFd(message, 'rats');
        }

        if (cmd === (command[7]) ) {
            let name = message.guild.name;
                                                let num = message.guild.memberCount;
                                                message.reply({
                                                        content: `${name} currently has ${num} member(s) inside the server.`
            })
        }

        if (cmd === (command[8])) {
            /*
            // TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
            // TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
            // TypeScript: import ytdl = require('ytdl-core'); with neither of the above

            ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .pipe(fs.createWriteStream('video.mp4'));
                    }
                }
            //message.channel.send({file: ['./video.mp4']});
            */
           message.reply({
                content: 'function in progress.'
           })
        }

        if (cmd === (command[9])) {
            imageFd(message, 'cute ikea shark')
        }

        if (cmd === (command[10])) {
            /*
            fs.readFile('./textFile/quotes.txt', function (err, data) {
                if (err) throw err;
            
                console.log(data.toString());
            });*/
            let nsidx = randTalkLen;
            while(nsidx >= randTalkLen-1 || nsidx % 2 != 0) {
                nsidx = getRandom(randTalkLen);
            }
            message.reply({
                content: `#${nsidx/2 + 1}  :  ` + randTalk[nsidx] + '\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t------' + randTalk[nsidx+1]
            })
        }

        if (cmd === (command[11])) {
            //console.log('kicking(still in progress)');
            //client.commands.get('kick').execute(message, args);
						if (!message.mentions.users.size) {
								return message.reply('a little reminder of kicking someone out from Sharks:\nUsage: \"kick [tag user(s)]\"');
}
						const taggedUser = message.mentions.users.first();
						message.channel.send(`Sharkmama wanted to kick: ${taggedUser.username}`);
        }

                        if(cmd === (command[12])) {
                                                let p = getRandom(dps.length)
            message.reply({
                content: `Dear ${message.author}, time to get on highlight with *${dps[p]}* in Overwatch`
            })
                        }
                        if(cmd === (command[13])) {
                                                let p = getRandom(tank.length)
            message.reply({
                content: `Dear ${message.author}, I hope you enjoy *${tank[p]}* as a tank in Overwatch`
            })
                        }
                        if(cmd === (command[14])) {
                                                let p = getRandom(sup.length)
            message.reply({
                content: `Dear ${message.author}, good luck having a stroke playing *${sup[p]}* to heal your team in Overwatch`
            })
                        }
                        if(cmd === command[15]) {
                                if (!message.mentions.users.size) {
                                        return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
                                }

                        /*
                                const avatarList = message.mentions.users.map(user => {
                                return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
                        });

                        console.log(avaterList);
                        // Send the entire array of strings as a message
                        // By default, discord.js will `.join()` the array with `\n`
                        */
                        message.channel.send("still in progress on other's avater");

                        }
                                if(cmd === command[16]) {
                                        if(args.length != 1) return message.channel.send(`as a reminder from Sharks. \nUsage:\"search [keyword]\", dear ${message.author}`);
                                        imageFd(message, args[0]);
                                }
					if (cmd === (command[17])) {
                                        if(args.length != 1) return message.channel.send(`as a reminder from Sharks. \nUsage:\"roll [upper bound]\", dear ${message.author}`);
						let rn = getRandom(Number(args))
                                        message.reply({
                content: `Today's luck shark number is ${rn}.`
            })
                                }
    }
})

async function imageFd(message, str) {
    gis(str, logResults);

    function logResults(error, results) {
        if (error) {
            console.log(error + 'nmsl');
          }
        else {
            let idx = getRandom(results.length)
            message.channel.send(results[idx].url);
            //const res: Img = results[0];
        }
    }
}

const randTalk  =  ['Walter, put your DS away walter.', 'virtual dog',
'I want to suck a dick', 'photatoeggs',
'怎麼去118，先找到社科院；阿怎麼去社科院? 找一群看起來比較笨的人跟著他們走', 'photatoeggs',
'你要不要幫beta shark裝ad block', 'The genius Photatoeggs', 
'AYAYAYAYAYAYA', 'photatoeggs',
'cock', 'photatoeggs',
'invite me DADDY', 'photatoeggs',
'SUS', 'photatoeggs',
'有按鈕就按', 'photatoeggs',
'and then they fucked', 'photatoeggs',
'ugh ugh ugh ah aH AH AHHHH我要中風了!!!!', 'photatoeggs',
'我英文好爛', 'TOEIC 990',
'吸屌怎麼有音樂?', 'photatoeggs',
'白你室友又在吸屌是不是', 'photatoeggs',
'ALCOHOL!!!!', 'photatoeggs',
'sharkmama', 'theCrack',
'我她媽振聽啦幹', 'theCrack',
'凌晨1點要去哪裡買炒飯?', 'thecrack',
'不要，不要，不要! 不要辣幹!!!(死去)', 'theCrack' ,
'歡迎，銀河 波賽頓!', 'theCrack',
'公三小啦，快點推塔', '凱格路人',
'看看你的左邊，再看看你的右邊，你們三個有一個會被當', 'P',
'A', 'gura',
'幹你娘麥克風怎麼收不到音', 'Asheep_Ban',
'我想吃統一布丁', 'Sun the boss',
'好不奘喔', 'shiro',
'我是ㄌㄌㄎ', 'shiro',
'你有病吧', 'shiro',
'我就不要買正版minecraft', 'shiro',
'我玩完那個遊戲我都射了', 'shiro',
'我要去喝薑茶', '薑茶男孩',
'那個...那個誰在...G8位!!', 'shiro',
'屁眼屁眼!!', 'shiro',
'幹你那甚麼植物人槍法', 'Moody',
'你今天不給我一個交代，明天就不用去上課了，來我家報到。', 'Moody',
'好色喔!', 'Moody',
'monke', 'timli',
'(brimstone)我要等拆包聲音在開大啊....*死去*', 'monkey',
'This is my kingdom cum', 'flyingtofu',
'今晚我要跟三個男的去現充', 'flyingtofu',
'每當我看到這個鍵盤..我都會想起她', 'flyingtofu',
'我真的不懂文組腦袋都在裝甚麼誒', 'flyingtofu',
'她會打排球誒，好暈', 'flyingtofu',
'你到底怎麼上星耀的= =?', 'flyingtofu',
'打高爾夫囉!', 'flyingtofu',
'我朋友把我的充電線燒了', 'flyingtofu',
'他是不是又在吸屌', 'flyingtofu',
'你媽3趴', 'shiro',
'我要開始說好話運動....(1分鐘後)幹她是智障是不是' , 'flyingtofu',
'你們現在對我講騷話，就是在騷擾未成年，我可以告你們喔!', 'flyingtofu',
'What the fuck is a KILOMETER (gun noise)', 'american eagle',
'如果可以的話，我希望你們稱我為魚人王', '魚人王',
'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM', 'microwave',
'我都花一次兩百塊去台大游泳', '燻雞',
'宙斯都在睡覺不跟我們打籃球', '燻雞',
'怎麼跟開水出門都在喝酒', '燻雞',
'燻雞都在腹黑還有約會不跟我們玩賣快', '星辰宙斯',
'要不要來蓋個minecraft的成功? (在十分鐘後消失)', 'CTU daniel',
'不要動我的PPT!!', '台大化學系教授',
'GIVE ME MY RAZE!!!! (SOBBING)', 'least insane Valorant player',
'阿你們課程都沒看喔? interesting.', 'DEVILSCAR',
'Yahi Param Vaastavikta Hai!!', 'Symmetra',
'Nah Nah!', 'Astra'];
const randTalkLen = randTalk.length;
client.login(process.env.TOKEN)
}

