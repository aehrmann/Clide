var T = require('timbre');
var CommandReader = require('./command_reader');
var Sequencer = require('./sequencer');
var keypress = require('keypress');

var sequences = [];

var genSymbols = function(num, sym) {
	return Array(num).join(sym);
}

var clearScreen = function() {
	console.log("\033[2J\033[0f");
}
var printTitle = function() {
	console.log("BEATBLOX");
}

var printInitial = function() {
	console.log("|" + genSymbols(40, ' ') + "|");
	console.log("|" + genSymbols(40, ' ') + "|");
	console.log("|" + genSymbols(40, ' ') + "|");
	console.log("|" + genSymbols(40, ' ') + "|");
	console.log("|" + genSymbols(40, ' ') + "|");
	console.log("|" + genSymbols(40, ' ') + "|");
	console.log("|" + genSymbols(40, ' ') + "|");
	console.log("|" + genSymbols(40, ' ') + "|");
};

// Simple CLI (play and pause)
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdout.resume();
process.stdout.setEncoding('utf8');
var util = require('util');


var counter = 0;

var executeCommand = function(text) {
	clearScreen();
	printTitle();
	// console.log(counter++);
	printInitial();
	console.log(genSymbols(42,'*'));
	var output = CommandReader.execute(text);
	for(var i = 0; i < output.length; i++) {
		if(output[i].err) {
			console.log(output[i].message.red);
		} else {
			console.log(output[i].message.green);
		}
	}
	process.stdout.write("> ");
};
// clearScreen();
// printTitle();

process.stdin.on('data', executeCommand);
clearScreen();
printTitle();
process.stdout.write("> ");

