var BeatSequence = require('./beat_sequence.js');

var Sequencer = function () {};

Sequencer.prototype.constructor = function() {
	this.sequences = [];
	this.rate = 200;
	this.timer = T('interval', {interval: this.rate+"ms", delay: "200ms"}, function() { 
		for (var i = 0; i < this.sequences.length; i++) {
			this.sequences[i].playNext();
		};
	});
};

Sequencer.prototype.addSequence = function(sequence) {
	this.sequences.push(sequence);
};

Sequencer.prototype.removeSequence = function(i) {
	this.sequences.splice(i, 1);
};

Sequencer.prototype.playSequence = function(i) {
	this.sequences[i].play();
};

Sequencer.prototype.pauseSequence = function(i) {
	this.sequences[i].pause();
};

Sequencer.prototype.playAll = function() {
	this.timer.start();
};

Sequencer.prototype.pauseAll = function() {
	this.timer.stop();
};

Sequencer.prototype.changeSpeed = function(time) {
	this.rate = time;
	this.timer = T('interval', {interval: this.rate+"ms", delay: "200ms"}, function() {
		for (var i = 0; i < this.sequences.length; i++) {
			this.sequences[i].playNext();
		};
	});
};

module.exports = Sequencer;