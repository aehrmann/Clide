var T = require('timbre');
var CommandReader = require('./command_reader');
var Sequencer = require('./sequencer');
var keypress = require('keypress');

var sequences = [];

var pauseRawMode = function() {
	console.log("paused raw");
  refresher.stop();
  process.stdin.setRawMode(false);
	process.stdin.resume();
	// process.stdin.removeListener('keypress', pauseRawMode);
};

var resumeRawMode = function() {
	// make `process.stdin` begin emitting "keypress" events
	keypress(process.stdin);
	// listen for the "keypress" event
	console.log("resumed raw");
	process.stdin.on('keypress', pauseRawMode);
	process.stdin.setRawMode(true);
	process.stdin.resume();
};

var genSymbols = function(num, sym) {
	return Array(num).join(sym);
}

function restartDrawing() {
	refresher.start();
	process.stdin.on('keypress', pauseRawMode);
}

function clearScreen() {
	console.log("\033[2J\033[0f");
}

function stopRefreshing() {
	refresher.stop();
}

var refreshScreen = function() {
	clearScreen();
	console.log("#" + genSymbols(40, '-') + "#");
	console.log("#" + genSymbols(16, '-') + ' Beeline ' + genSymbols(16, '-') + "#");
	console.log("#" + genSymbols(40, '-') + "#");
	Sequencer.display('all');
	process.stdout.write('> ');
};

var waitForEnter = function() {
	resumeRawMode();
	process.stdin.on('keypress', function(ch, key) {
		if(key.name = 'enter') {
			restartDrawing();
			refresher.start();
			this.removeListener('keypress', waitForEnter);
			resumeRawMode();
		}
	});
};

var refresher = T("interval", {interval: 20}, refreshScreen);

// Simple CLI (play and pause)
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdout.resume();
process.stdout.setEncoding('utf8');
var util = require('util');

var executeCommand = function(text) {
	pauseRawMode();
	refresher.stop();
	CommandReader.execute(text);
	console.log(text);
	waitForEnter();
};

refreshScreen();
restartDrawing();
pauseRawMode();
process.stdin.on('data', executeCommand);

