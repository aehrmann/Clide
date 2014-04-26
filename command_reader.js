var Sequencer = require('./sequencer.js');

var PLAY_REGEX = /pl\s?(\d+)?/;
var PAUSE_REGEX = /pa\s?(\d+)?/;
var ADD_REGEX = /a\s+(\w{2,}\s*)+/;

var execute = function(command) {
	command = command.trim();
	console.log("<ENTERED: '" + command +"'>");
	if (command === 'quit' || command === 'q') {
		process.exit();
	} 
	else {
		if (command.match(PLAY_REGEX)) {
			var matches = PLAY_REGEX.exec(command);
			console.log(matches);
		} 
		else if (command.match(PAUSE_REGEX)) {
			console.log("pause");
		} 
		else if (command.match(ADD_REGEX)) {
			var pattern = new RegExp(ADD_REGEX);
			console.log("add");
			var matches = pattern.exec(command);
			console.log(matches);
			matches = pattern.exec(command);
			console.log(matches);
		}
	}
};

module.exports.execute = execute;