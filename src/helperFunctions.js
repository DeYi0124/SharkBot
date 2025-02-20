import { createRequire } from "module";
import fs from "fs" //import fs from 'fs';
const require = createRequire(import.meta.url);
import yytdl from "ytdl-core"
import { EmbedBuilder } from "discord.js"
function errorHandling(message, err) {
  console.error(err);
  message.channel.send("Sharkmama is reading the error message, I don't know what that means :(")
}
export function getRandom(x) {  
  return Math.floor(Math.random() * x);
}

export function leftToEight() {
  var d = new Date();
  return -d + d.setHours(8, 0, 0, 0);
}

export async function imageFd(message, str) {
  const gis = require("async-g-i-s");
  (async () => {
    try {
      const results = await gis(str);
      let idx = getRandom(results.length);
      message.channel.send(results[idx].url);
    } catch (e) {
      errorHandling(message, e);
    }
  })();
}

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

export async function fetchWeather(city, message) {
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

export async function DL(url, message, flag) {
  message.channel.send("Sharks are looking for the file...");
  if (flag == 0) {
    let res = await yytdl(url, { filter: "audioonly", format: "mp3" });
    console.log(res)
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
    // console.log(audioName);

    let file = await res
      .pipe(fs.createWriteStream(`${audioName}.mp3`))
      .on("close", function () {
        console.log(file.path)
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

export function span(channel, word) {
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
export function displayRoles(message) {
  message.channel.send("loading roles in the server:");
  let roles = message.guild.roles.cache.map((role) => role.name);
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

export function changeRoles(message, num) {
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
