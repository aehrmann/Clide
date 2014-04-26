var T = require('timbre');

var beats = {};

T("audio").loadthis("drum_samples/drum_samples.wav", function() {
	beats['BD'] = this.slice(0, 200).set({mul: 1});
	beats['SD'] = this.slice(200, 400).set({mul: 1});
	beats['HH'] = this.slice(400, 600).set({mul: 1});
	beats['HT'] = this.slice(600, 800).set({mul: 1});
	beats['LT'] = this.slice(800, 1000).set({mul: 1});
	beats['CY'] = this.slice(1000, 1200).set({mul: 1});
});

var translate = function(seqString) {
	var parts = seqString.toUpperCase().split(' ');
	var seq = [];
	for (var i = 0; i < parts.length; i++) {
		if(parts[i] === ',') {
			seq.push(null);		
		} else {
			seq.push(beats[parts[i]]);	
		}
	}
	console.log(seq);
	return seq;
};

var BeatSequence = function(seqString) {
	this.index = 0;
	this.sequenceString = seqString;
	this.sequence = translate(seqString);
};

BeatSequence.prototype.playing = true;

BeatSequence.prototype.play = function() {
	this.playing = true;
};

BeatSequence.prototype.pause = function() {
	this.playing = false;
};


BeatSequence.prototype.playNext = function() {
	if(this.playing && this.sequence[this.index]) {
			this.sequence[this.index].bang().play();
	}
	this.index = (this.index + 1) % this.sequence.length;
};

module.exports = BeatSequence;