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
			}
		};
	}
};

module.exports.execute = execute;