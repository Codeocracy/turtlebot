var Discord = require("discord.io");
var config = require(".config.json");
var fs = require('fs');
var dire = fs.readdirSync('./TurtlePics');

var bot = new Discord.Client({
    token: config.token,
    autorun: true
})

function newTurtlePic() {
    var index = Math.floor(Math.random()*dire.length);
    return dire[index];
}

function checkRequest(mess) {

    sendIndex = mess.indexOf("send")
    turtleIndex = mess.indexOf("turtle")

    if ((turtleIndex > sendIndex) && (turtleIndex != -1) && (sendIndex != -1)) {
    
        var theNum = mess.replace( /^\D+/g, '');
        var nTurtles = parseInt(theNum, 10);
    
        if (nTurtles > 1000) {
            nTurtles = 1000
        }
        return nTurtles;
    }
    else {
        return 0;
    }
}

function sendTurtles(nTurtles) {

    // calculate how many turtles are needed beyond potentially maxed-out messages
    var remainder = nTurtles % 250;

    // each message can have at max 250 turtle emoji.
    // Calculate how many n of these maxed messages are needed
    nMax = Math.floor(nTurtles/250);

    // send nMax 250-turtle messages
    if (nMax != 0) {
        emote250 = "🐢".repeat(250);
        for (nMax; nMax > 0; nMax--) {
            message.channel.send(emote250);
        }
    }

    // send remainder of requested turtles
    if (r != 0) {
        message.channel.send("🐢".repeat(r));
    }

    return;    
}

bot.on('message', function (user, userID, channelID, message, evt) {

	if (userID == bot.id) {
		return;
    }

    if (message.content.toLowerCase().startsWith("/turtle")) {
        message.channel.send({ files: ['./TurtlePics/' + newTurtlePic()]});
        return;
    }
    
    nTurtles = checkRequest(message.content.toLowerCase());
    if (nTurtles > 0) {
        sendTurtles(nTurtles);
    }
});

client.login(config.token);