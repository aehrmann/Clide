var T = require('timbre');
var colors = require('colors');
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

var setSpeedBPM = function(index, speed) {
	pauseAll();
	sequences[index].setSpeed(speed);
	playAll();
	return true;
};

var setSpeedBPMAll = function(speed) {
	pauseAll();
	for (var i = 0; i < sequences.length; i++) {
		sequences[i].setSpeed(speed);
	};
	playAll();
	return true;
};

var setSpeedMs = function(index, speed) {
	pauseAll();
	sequences[index].setSpeed(speed);
	playAll();
	return true;
};

var setSpeedMsAll = function(speed) {
	pauseAll();
	for (var i = 0; i < sequences.length; i++) {
		sequences[i].setSpeed(speed);
	};
	playAll();
	return true;
};

// Status can be 'all', 'active', 'inactive'
var display = function(status) {
	var title = '| Sequences {' + status[0].toUpperCase() + status.substring(1) + '} |';
	console.log(Array(title.length + 1).join(' ').underline.blue);
	console.log(title.bold.underline.blue);

	if(sequences.length === 0) {
		console.log('No sequences loaded...'.red);
	}

	var displayString = '';
	for(var i = 0; i < sequences.length; i++) {
		displayString += (i + 1) + ': ';
		displayString += sequences[i].toString() + ' ';
		displayString += Array(maxSeqStringLength() - sequences[i].toString()).join(' ');
		displayString += '(' + (sequences[i].isPlaying() ? 'active' : 'inactive') + ') ';
		displayString += '[' + sequences[i].currentSpeed() + 'ms]';
		console.log(displayString);
		displayString = '';
	}
}

var maxSeqStringLength = function() {
	var sum = 0;
	for (var i = 0; i < sequences.length; i++) {
		if (sum < sequences[i].length) 
			sum = sequences[i].length;
	};
	return sum;
}

var displayAll = function() {
	console.log('Sequences {All}');
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

var displayActive = function() {
	console.log('Sequences {Active}');
	console.log('------------------');
	if(sequences.length === 0) {
		console.log('No sequences loaded...');
	}
	var displayString = '';
	for(var i = 0; i < sequences.length; i++) {
		if(sequences[i].isPlaying()) {
			displayString += (i + 1) + ': ';
			displayString += sequences[i].toString() + ' ';
			displayString += '(' + (sequences[i].isPlaying() ? 'active' : 'inactive') + ') ';
			displayString += '[' + sequences[i].currentSpeed() + 'ms]';
			console.log(displayString);
			displayString = '';
		}
	}
};

var displayInactive = function() {
	console.log('Sequences {Inactive}');
	console.log('--------------------');
	if(sequences.length === 0) {
		console.log('No sequences loaded...');
	}
	var displayString = '';
	for(var i = 0; i < sequences.length; i++) {
		if(!sequences[i].isPlaying()) {
			displayString += (i + 1) + ': ';
			displayString += sequences[i].toString() + ' ';
			displayString += '(' + (sequences[i].isPlaying() ? 'active' : 'inactive') + ') ';
			displayString += '[' + sequences[i].currentSpeed() + 'ms]';
			console.log(displayString);
			displayString = '';
		}
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
	setSpeedMs: setSpeedMs,
	setSpeedMsAll: setSpeedMsAll,
	display: display,
	numSequences: numSequences
}