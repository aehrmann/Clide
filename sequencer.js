var T = require('timbre');
var BeatSequence = require('./beat_sequence.js');


var sequences = [];
var rate = 200;

var addSequence = function(sequence) {
	if(sequence == null) {
		return false;
	}
	sequences.push(new BeatSequence(sequence));
	return true;
};

var removeSequence = function(i) {
	var removed = sequences[i];
	sequences.splice(i, 1);
	removed.destroy();
	return true;
};

var removeAll = function() {
	for (var i = 0; i < sequences.length; i++) {
		sequences[i].destroy();
	}
	sequences = [];
}
var playSequence = function(i) {
	sequences[i].play();
	return true;
};

var pauseSequence = function(i) {
	sequences[i].pause();
	return true;
};

var playAll = function() {
	for (var i = 0; i < sequences.length; i++) {
		sequences[i].play();
	};
	return true;
};

var pauseAll = function() {
	for (var i = 0; i < sequences.length; i++) {
		sequences[i].pause();
	};
	return true;
};

var setSpeed = function(index, speed) {
	pauseAll();
	sequences[index].setSpeed(speed);
	playAll();
	return true;
};

var setSpeedAll = function(speed) {
	pauseAll();
	for (var i = 0; i < sequences.length; i++) {
		sequences[i].setSpeed(speed);
	};
	playAll();
	return true;
};

var displaySequences = function() {
	console.log('|Sequences|');
	if(sequences.length === 0) {
		console.log('No sequences loaded...');
	}
	var displayString = '';
	for(var i = 0; i < sequences.length; i++) {
		displayString += (i + 1) + ': ';
		displayString += sequences[i].toString() + ' ';
		displayString += '(' + (sequences[i].isPlaying() ? 'active' : 'inactive') + ') ';
		displayString += '[' + sequences[i].currentSpeed() + 'ms]';
		console.log(displayString);
		displayString = '';
	}
};

var numSequences = function() {
	return sequences.length;
};

module.exports = {
	addSequence: addSequence,
	removeSequence: removeSequence,
	removeAll: removeAll,
	playSequence: playSequence,
	pauseSequence: pauseSequence,
	playAll: playAll,
	pauseAll: pauseAll,
	setSpeed: setSpeed,
	setSpeedAll: setSpeedAll,
	displaySequences: displaySequences, 
	numSequences: numSequences
}