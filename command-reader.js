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
		pattern: new RegExp('^quit|q$'),
		action: function() {
			process.exit();
		}
	},
	{
		pattern: new RegExp('^ls$'),
		action: function() {
			console.log('list all');
			Sequencer.display('all');
		}
	},
	{
		pattern: new RegExp('^la$'),
		action: function() {
			console.log('list active');
			Sequencer.display('active');
		}
	},
	{
		pattern: new RegExp('^li$'),
		action: function() {
			console.log('list inactive');
			Sequencer.display('inactive');
		}
	},
	{
		pattern: new RegExp('^pl$'),
		action: function() {
			console.log('play all');
			Sequencer.playAll();
		}
	},
	{
		pattern: new RegExp('^pl (\\d+)$'),
		action: function(nStr) {
			console.log('from pl n: ' + parseInt(nStr));
			// Sequencer.playSequence();
		}
	},
	{
		pattern: new RegExp('^a (BD|SD|HH|HT|LT|CY| )+$', 'g'),
		action: function(args) {
			console.log('add: ' + args);
			// Sequencer.addSequence("BD SD");
			// Sequencer.playAll();
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
			// console.log(commands[i].pattern);
			var parts = commands[i].pattern.exec(command);
			// console.log(parts);
			if(parts) {
				console.log(parts);
				if(parts.length >= 1) {
					// console.log('slice: ' + parts.slice(1));
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