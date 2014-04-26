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
			var pieces = command.split(' ');
			if(pieces.length === 1) {
				Sequencer.playAll();
			} 
			else {
				var index = parseInt(pieces[1]);
				Sequencer.playSequence(index);	
			}
			
		} 
		else if (command.match(PAUSE_REGEX)) {
			var pieces = command.split(' ');
			if(pieces.length === 1) {
				Sequencer.pauseAll();
			} 
			else {
				var index = parseInt(pieces[1]);
				Sequencer.pauseSequence(index);	
			}
		} 
		else if (command.match(ADD_REGEX)) {
			var pieces = command.split(' ');
			pieces = pieces.splice(1, pieces.length);
			if(!Sequencer.addSequence(pieces.join(' '))) {
				console.log('Bad sequence');
			}
		};
	}
};

module.exports.execute = execute;