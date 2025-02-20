import fetch from "node-fetch"
const riotKey = "RGAPI-812f9f96-a057-479f-a141-0c128b511aca"
const sp = "%20"

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


export async function fetchSumByName(message, name, tag) {
  const link = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${riotKey}`
  const response = await fetch(link).catch(() => {
    message.channel.send("Sharks had encountered unknown obstacles reaching the desired player in TW server!")
  })
  const datata = await response.json();
  let besties = await findMastery(datata.puuid, message)
  console.log(besties)

  let rks = ["", ""];//solo, flex
  const data = await fetchOldRiot(message, datata.puuid);
  await fetchRank(message, data.id, rks);

  let mastery = ""
  for (let i = 0;i<besties.length;i++) {
    mastery += `${i+1} - level ${besties[i].championLevel} ${await championID2name(besties[i].championId)} with Points at ${besties[i].championPoints}\n`
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

async function championID2name(id) {
  //link: https://ddragon.leagueoflegends.com/cdn/14.15.1/data/zh_TW/champion.json
  const link = `https://ddragon.leagueoflegends.com/cdn/14.15.1/data/zh_TW/champion.json`
  const response = await fetch(link).catch((err) => {  
    console.log(err)
    return message.channel.send("champion.json error");
  })
  if(response.status == 404) {
    return message.channel.send("champion.json error");
  } else if (response.status != 200) {
    console.log(response)
    return message.channel.send("Sharks may have encounterd some obstacles.")
  }
  const data = await response.json();
  for (let champion in data.data)
    if(data.data[champion].key == id) {
      return champion
    }
  return -1
}
