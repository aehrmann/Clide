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
		Sequencer.display('all');
	},
	play: function(i) {
		Sequencer.playSequence(i);
		Sequencer.display('all');
	},
	pauseAll: function() {
		Sequencer.pauseAll();
		Sequencer.display('all');
	},
	pause: function(i) {
		Sequencer.pauseSequence(i);
		Sequencer.display('all');
	},
	add: function(seqString) {
		Sequencer.addSequence(seqString);
		Sequencer.display('all');
	},
	clearAll: function() {
		Sequencer.removeAll();
		Sequencer.display('all');
	},
	clear: function(i) {
		Sequencer.removeSequence(i);
		Sequencer.display('all');
	},
	setSpeedAll: function(speed) {
		Sequencer.setSpeedMsAll();
		Sequencer.display('all');
	},
	setSpeed: function(i, speed) {
		Sequencer.setSpeedMs(i, speed);
		Sequencer.display('all');
	}
};

var commands = [
	{
		pattern: new RegExp('^quit|q$'),
		action: function() {
			process.exit();
		}
	},
	{
		pattern: new RegExp('^ls$'),
		action: function() {
			Sequencer.display('all');
		}
	},
	{
		pattern: new RegExp('^la$'),
		action: function() {
			Sequencer.display('active');
		}
	},
	{
		pattern: new RegExp('^li$'),
		action: function() {
			Sequencer.display('inactive');
		}
	},
	{
		pattern: new RegExp('^pl$'),
		action: function() {
			Sequencer.pauseAll();
			Sequencer.playAll();
			Sequencer.display('all');
		}
	},
	{
		pattern: new RegExp('^pl (\\d+)$'),
		action: function(nStr) {
			var n = parseInt(nStr);
			Sequencer.playSequence(n);
			Sequencer.display('all');
		}
	},
	{
		pattern: new RegExp('^a (.*)$'),
		action: function(args) {
			Sequencer.addSequence(args[0]);
			Sequencer.display('all');
		}
	},
	{
		pattern: new RegExp('^pa$'),
		action: function() {
			Sequencer.pauseAll();
			Sequencer.display('all');
		}
	},
	{
		pattern: new RegExp('^rm (\\d+)$'),
		action: function(nStr) {
			var n = parseInt(nStr);
			Sequencer.removeSequence(n);
			Sequencer.display('all');
		}
	},
	{
		pattern: new RegExp('^clear$'),
		action: function() {
			Sequencer.removeAll();
			Sequencer.display('all');
		}
	},
	{
		pattern: new RegExp('^ss (\\d+) (\\d+)$'),
		action: function(args) {
			Sequencer.setSpeedMs(args[0], args[1]);
			Sequencer.display('all');
		}
	}

];
	
var isValidCommand = function(command) {
	for (var i = 0, len = commands.length; i < len; i++) {
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
		for (var i = 0, len = commands.length; i < len; i++) {
			var parts = commands[i].pattern.exec(command);
			if(parts) {
				if(parts.length >= 1) {
					commands[i].action(parts.slice(1));
				}
				else {
					commands[i].action();
				}
			}
		};
	}
	return output;
};

module.exports.execute = execute;