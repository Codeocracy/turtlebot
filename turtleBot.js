const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
var fs = require('fs');
var dire = fs.readdirSync('./TurtlePics');

client.on("ready", () => {
    console.log("turtle");
});

client.on('disconnect', function(erMsg, code) {
	console.log('---- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '----');
	client.connect();
});

function newTurtlePic() {
    var index = Math.floor(Math.random()*dire.length);
    return dire[index];
}

function checkRequest(mess) {

    sendIndex = mess.indexOf("send")
    turtleIndex = mess.indexOf("turtle")

       
        var theNum = mess.replace( /^\D+/g, '');
        var nTurtles = parseInt(theNum, 10);
    
        if (nTurtles > 1000) {
            nTurtles = 1000
        }
        return nTurtles;
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
    if (remainder != 0) {
        message.channel.send("🐢".repeat(r));
    }

    return;    
}

client.on('message', (message) => {

    // don't reply to other bots
	if (message.author.bot) return;

    // send turtle pictures
    if (message.content.toLowerCase().startsWith("/turtle")) {
        message.channel.send({ files: ['./TurtlePics/' + newTurtlePic()]});
        return;
    }

    // send a number of requsted turtle emojis
    turtleIndex = message.content.toLowerCase().indexOf("turtle");
    sendIndex = message.content.toLowerCase().indexOf("send");
    if ((turtleIndex > sendIndex) && (turtleIndex != -1) && (sendIndex != -1)) {
        nTurtles = checkRequest(message.content.toLowerCase());
        sendTurtles(nTurtles);
        return;
    }

    // randomly react to messages with turtle emoji
    var num = Math.random();
    if (num <= 0.01) {
        message.react("🐢"); return;
    }
});

client.login(config.token);
