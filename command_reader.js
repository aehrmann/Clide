var Sequencer = require('./sequencer.js');

var output = [];
var outputSuccess = function(message) {
	output.push({
		err: null,
		message: message
	});
};

var outputFailure = function(message) {
	output.push({
		err: new Error(),
		message: message
	});
};

var flush = function() {
	output = [];
};

var commands = {
	quit: function() {
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
			process.exit();
		}
	},
	{
		pattern: new RegExp('^ls$'),
		action: function() {
			outputSuccess('list all');
			Sequencer.display('all');
		}
	},
	{
		pattern: new RegExp('^la$'),
		action: function() {
			outputSuccess('list active');
			Sequencer.display('active');
		}
	},
	{
		pattern: new RegExp('^li$'),
		action: function() {
			outputSuccess('list inactive');
			Sequencer.display('inactive');
		}
	},
	{
		pattern: new RegExp('^pl$'),
		action: function() {
			outputSuccess('play all');
			Sequencer.playAll();
		}
	},
	{
		pattern: new RegExp('^pl (\d+)$'),
		action: function() {
			outputSuccess('play one');
		}
	},
	{
		pattern: new RegExp('^a$'),
		action: function() {
			Sequencer.addSequence("BD SD");
			Sequencer.playAll();
		}
	},
	{
		pattern: new RegExp('^pa$'),
		action: function() {
			Sequencer.pauseAll();
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

var execute = function(command) {
	flush();
	command = command.trim();

	if(!isValidCommand(command)) {
		outputFailure("Entered invalid command: " + command);
	}
	else {
		for (var i = 0; i < commands.length; i++) {
			// console.log(commands[i].pattern);
			if(commands[i].pattern.test(command)) {
				commands[i].action();
			}
		};
	}
	return output;
};

module.exports.execute = execute;