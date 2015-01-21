/**************************************
 Beat Sequence - this module contains an object representing a single sequence 
 of samples and metadata about the sequence, including speed, and its own timer,
 used to adjust individual sequences to different speeds.
***************************************/

var T = require('timbre');

var beats = {};
// The list of canonical sample names entered by the user
var SAMPLE_NAMES = ['BD', 'SD', 'HH', 'HT', 'LT', 'CY'];

// Load the initial samples from the 808 sample file
T("audio").loadthis("drum_samples/808.wav", function() {
	beats['BD'] = this.slice(0, 200).set({mul: 0.5});
	beats['SD'] = this.slice(200, 400).set({mul: 0.5});
	beats['HH'] = this.slice(400, 600).set({mul: 0.5});
	beats['HT'] = this.slice(600, 800).set({mul: 0.5});
	beats['LT'] = this.slice(800, 1000).set({mul: 0.5});
	beats['CY'] = this.slice(1000, 1200).set({mul: 0.5});
});

// As of now constructor only takes a string of sample names, but support for 
// custom intervals is coming (default now is 200ms)

var BeatSequence = function(seqString) {
	this.index = 0;
	this.sequenceString = seqString.toUpperCase().split(' ');
	this.sequence = this.translate(seqString);
	this.speed = 200;
	var self = this;
	this.timer = T('interval', {interval: "200ms", delay: "200ms"}, function() { 
		self.playNext();
	});
};

// Loads the samples from the main beats array into the sequence, based on the
// original string
// NOTE: ',' characters represents a rest, which are represented as null in the
// 				sequence's array of samples.
BeatSequence.prototype.translate = function(seqString) {
	var seq = [];
	for (var i = 0; i < this.sequenceString.length; i++) {
		if(this.sequenceString[i] === ',') {
			seq.push(null);		
		} else if (SAMPLE_NAMES.indexOf(this.sequenceString[i]) != -1) {
			seq.push(beats[this.sequenceString[i]]);	
		} else {
			return null;
		}
	}
	return seq;
};

// Adjust the speed of the timer - in ms
BeatSequence.prototype.setSpeed = function(speed) {
	this.timer.stop();
	this.speed = speed;
	var self = this;
	this.timer = T('interval', {interval: speed+"ms", delay: "200ms"}, function() {
		self.playNext();
	});
	if (this.playing) {
		this.timer.start();
	}
};

BeatSequence.prototype.currentSpeed = function() {
	return this.speed;
}

// Set all sequences to off by default
BeatSequence.prototype.playing = false;

BeatSequence.prototype.play = function() {
	this.timer.start();
	this.playing = true;
};

BeatSequence.prototype.pause = function() {
	this.timer.stop();
	this.playing = false;
};

// Plays the next sample in the sequence if the sequence is currently playing
BeatSequence.prototype.playNext = function() {
	if(this.playing && this.sequence[this.index]) {
			this.sequence[this.index].bang().play();
	}
	this.index = (this.index + 1) % this.sequence.length;
};
BeatSequence.prototype.isPlaying = function() {
	return this.playing;
}

// Represents the samples in the sequences. E.g. "[BD, SD, (), BD]"
BeatSequence.prototype.toString = function() {
	s = '[';
	for(var i = 0; i < this.sequenceString.length; i++) {
		if(this.sequenceString[i] === ',') {
			s += '()';
		} else {
			s += this.sequenceString[i].toUpperCase();
		}
		if(i !== this.sequenceString.length - 1) 
			s += ', ';
	}
	s += ']';
	return s;
};

BeatSequence.prototype.destroy = function() {
	this.timer.stop();
}

module.exports = BeatSequence;