var T = require('timbre');

var beats = {};
var SAMPLE_NAMES = ['BD', 'SD', 'HH', 'HT', 'LT', 'CY'];

T("audio").loadthis("drum_samples/808.wav", function() {
	beats['BD'] = this.slice(0, 200).set({mul: 0.5});
	beats['SD'] = this.slice(200, 400).set({mul: 0.5});
	beats['HH'] = this.slice(400, 600).set({mul: 0.5});
	beats['HT'] = this.slice(600, 800).set({mul: 0.5});
	beats['LT'] = this.slice(800, 1000).set({mul: 0.5});
	beats['CY'] = this.slice(1000, 1200).set({mul: 0.5});
});

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

BeatSequence.prototype.playing = false;

BeatSequence.prototype.play = function() {
	this.timer.start();
	this.playing = true;
};

BeatSequence.prototype.pause = function() {
	this.timer.stop();
	this.playing = false;
};

BeatSequence.prototype.playNext = function() {
	if(this.playing && this.sequence[this.index]) {
			this.sequence[this.index].bang().play();
	}
	this.index = (this.index + 1) % this.sequence.length;
};
BeatSequence.prototype.isPlaying = function() {
	return this.playing;
}

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