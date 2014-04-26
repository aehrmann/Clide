var T = require('timbre');
var BeatSequence = require('./beat_sequence.js');


var sequences = [];
var rate = 200;
var timer = T('interval', {interval: rate+"ms", delay: "200ms"}, function() { 
	for (var i = 0; i < sequences.length; i++) {
		sequences[i].playNext();
	}
});

addSequence = function(sequence) {
	if(sequence == null) {
		return false;
	}
	sequences.push(new BeatSequence(sequence));
	return true;
};

removeSequence = function(i) {
	sequences.splice(i, 1);
	return true;
};

playSequence = function(i) {
	sequences[i].play();
	return true;
};

pauseSequence = function(i) {
	sequences[i].pause();
	return true;
};

playAll = function() {
	timer.start();
	return true;
};

pauseAll = function() {
	timer.stop();
	return true;
};

changeSpeed = function(time) {
	rate = time;
	timer = T('interval', {interval: rate+"ms", delay: "200ms"}, function() {
		for (var i = 0; i < sequences.length; i++) {
			sequences[i].playNext();
		};
	});
	return true;
};

module.exports = {
	addSequence: addSequence,
	removeSequence: removeSequence,
	playSequence: playSequence,
	pauseSequence: pauseSequence,
	playAll: playAll,
	pauseAll: pauseAll,
	changeSpeed: changeSpeed
}