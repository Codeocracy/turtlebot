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

bot.on('message', function (user, userID, channelID, message, evt) {
	if (userID == bot.id) {
		return;
    }
    if (message.startsWith("/turtle")) {
        message.channel.send({ files: ['./TurtlePics/' + newTurtlePic()]});
        return;
    }  
});

client.login(config.token);