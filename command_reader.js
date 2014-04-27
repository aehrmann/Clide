var Sequencer = require('./sequencer.js');

var commands = {
	quit: function() {
		console.log('Quitting BeatBlocks...');
		process.exit();
	},
	listSequences: function() {
		Sequencer.display('all'); 
	},
	listActive: function() {
		Sequencer.display('active');
	},
	listInactive: function() {
		Sequencer.display('inactive');
	},
	playAll: function() {
		Sequencer.playAll();
	},
	play: function(i) {
		Sequencer.playSequence(i);
	},
	pauseAll: function() {
		Sequencer.pauseAll();
	},
	pause: function(i) {
		Sequencer.pauseSequence(i);
	},
	add: function(seqString) {
		Sequencer.addSequence(seqString);
	},
	clearAll: function() {
		Sequencer.removeAll();
	},
	clear: function(i) {
		Sequencer.removeSequence(i);
	},
	setSpeedAll: function(speed) {
		Sequencer.setSpeedMsAll();
	},
	setSpeed: function(i, speed) {
		Sequencer.setSpeedMs(i, speed);
	}
};

var commands = [
	{
		pattern: new RegExp('quit|q'),
		action: function() {
			console.log('Quitting BeatBlocks...');
			process.exit();
		}
	},
	{
		pattern: new RegExp('^l$'),
		action: function() {
			console.log('list all');
			// Sequencer.display('all');
		}
	},
	{
		pattern: new RegExp('^la$'),
		action: function() {
			console.log('list active');
			// Sequencer.display('active');
		}
	},
	{
		pattern: new RegExp('^li$'),
		action: function() {
			console.log('list inactive')
			// Sequencer.display('inactive');
		}
	},
	{
		pattern: new RegExp('^pl$'),
		action: function() {
			console.log('play all');
		}
	},
	{
		pattern: new RegExp('^pl (\d+)$'),
		action: function() {
			console.log('play one');
		}
	}
];
	
var isValidCommand = function(command) {
	for (var i = 0; i < commands.length; i++) {
		if(commands[i].pattern.test(command)) {
			return true;
		}
	}
	return false;
};

// 	commands: new RegExp('quit|q|l|la|li|pl|pa|cls|ss'),
// 	quit: new RegExp('quit|q'),
// 	list: new RegExp('^l(a|i)?$'),
// 	play: new RegExp('^pl(\d+)?'),
// 	pause: new RegExp('^pa\s?(\d+)?$'),
// 	add: new RegExp('a\s+((,|\w{2,})\s*)+'),
// 	remove: new RegExp('cls\s?(\d+)?'),
// 	setSpeed: new RegExp('ss\s+(\d+)')
// };


var execute = function(command) {
	// console.log(command);
	command = command.trim();

	// console.log("<ENTERED: '" + command +"'>");
	if(!isValidCommand(command)) {
		console.log("Entered invalid command: " + command);
	}
	else {
		for (var i = 0; i < commands.length; i++) {
			// console.log(commands[i].pattern);
			if(commands[i].pattern.test(command)) {
				commands[i].action();
			}
		};
	}
};

module.exports.execute = execute;