var Sequencer = require('./sequencer.js');

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
			// List of sequences is printed automatically after each command
			return;
		}
	},
	{
		pattern: new RegExp('^pl$'),
		action: function() {
			Sequencer.pauseAll();
			Sequencer.playAll();
		}
	},
	{
		pattern: new RegExp('^pl (\\d+)$'),
		action: function(nStr) {
			var n = parseInt(nStr);
			Sequencer.playSequence(n);
		}
	},
	{
		pattern: new RegExp('^a (.*)$'),
		action: function(args) {
			Sequencer.addSequence(args[0]);
		}
	},
	{
		pattern: new RegExp('^pa$'),
		action: function() {
			Sequencer.pauseAll();
		}
	},
	{
		pattern: new RegExp('^rm (\\d+)$'),
		action: function(nStr) {
			var n = parseInt(nStr);
			Sequencer.removeSequence(n);
		}
	},
	{
		pattern: new RegExp('^clear$'),
		action: function() {
			Sequencer.removeAll();
		}
	},
	{
		pattern: new RegExp('^ss (\\d+) (\\d+)$'),
		action: function(args) {
			Sequencer.setSpeedMs(args[0], args[1]);
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
	command = command.trim();

	if(!isValidCommand(command)) {
		outputFailure("Entered invalid command: " + command);
	}
	else {
		for (var i = 0, len = commands.length; i < len; i++) {
			var parts = commands[i].pattern.exec(command);
			if(parts) {
				// If the pattern for a command captures anything, 
				// pass it to the action function
				if(parts.length >= 1) {
					commands[i].action(parts.slice(1));
				}
				else {
					commands[i].action();
				}
				Sequencer.display('all');
			}
		};
	}
};

module.exports.execute = execute;