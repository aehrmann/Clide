var T = require('timbre')
var CommandReader = require('./command_reader');
var BeatSequence = require('./beat_sequence');

var sequences = [];

var main = function () {
	// Simple CLI (play and pause)
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	process.stdout.resume();
	process.stdout.setEncoding('utf8');
	var util = require('util');


	process.stdout.write('> ');
	process.stdin.on('data', function (text) {
	  CommandReader.execute(text);
	  process.stdout.write('> ');
	});
};

main();