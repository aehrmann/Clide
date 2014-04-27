var Sequencer = require('./sequencer.js');

var PLAY_REGEX = /pl\s?(\d+)?/;
var PAUSE_REGEX = /pa\s?(\d+)?/;
var ADD_REGEX = /a\s+((,|\w{2,})\s*)+/;
var REMOVE_REGEX = /r\s?(\d+)?/;
var SET_SPEED_REGEX = /s\s+(\d+)+/;

var execute = function(command) {
	command = command.trim();
	// console.log("<ENTERED: '" + command +"'>");
	
	if (command === 'quit' || command === 'q') {
		process.exit();
	} else if (command === 'ls') {
		Sequencer.displaySequences();
	}
	else {
		if (command.match(PLAY_REGEX)) {
			var pieces = command.split(' ');
			if(pieces.length === 1) {
				Sequencer.playAll();
			} 
			else {
				var index = parseInt(pieces[1]);
				if(index === 0 || index > Sequencer.numSequences()) {
					console.log("Number out of range!");
				}
				Sequencer.playSequence(index-1);	
			}
			
		} 
		else if (command.match(PAUSE_REGEX)) {
			var pieces = command.split(' ');
			if(pieces.length === 1) {
				Sequencer.pauseAll();
			} 
			else {
				var index = parseInt(pieces[1]);
				if(index === 0 || index > Sequencer.numSequences()) {
					console.log("Number out of range!");
				} 
				else {
					Sequencer.pauseSequence(index-1);	
				}
				
			}
		} 
		else if (command.match(ADD_REGEX)) {
			var pieces = command.split(' ');
			pieces = pieces.splice(1, pieces.length);
			if(!Sequencer.addSequence(pieces.join(' '))) {
				console.log('Bad sequence');
			}
		}
		else if (command.match(REMOVE_REGEX)) {
			var pieces = command.split(' ');
			if(pieces.length === 1) {
				Sequencer.removeAll();
			} 
			else {
				var index = parseInt(pieces[1]);
				if(index === 0 || index > Sequencer.numSequences()) {
					console.log("Number out of range!");
				}
				Sequencer.removeSequence(index-1);	
			}
		}
		else if (command.match(SET_SPEED_REGEX)) {
			var pieces = command.split(' ');
			if(pieces.length === 1) {
				console.log("No time specified...");
			} 
			else {
				if (pieces.length === 3) {
					console.log("speed for individual");
					var index = parseInt(pieces[1]);
					var speed = parseInt(pieces[2]);
					if(index === 0 || index > Sequencer.numSequences()) {
						console.log("Number out of range!");
					}
					else {
						Sequencer.setSpeed(index - 1, speed);	
					}
				}
				else if (pieces.length === 2) {
					console.log("speed for all");
					var speed = parseInt(pieces[1]);
					Sequencer.setSpeedAll(speed);
				}
				
			}
		}
	}
};

module.exports.execute = execute;