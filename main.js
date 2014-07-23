function Command(pattern, numArgs, action) {
  this.pattern = new RegExp(pattern);
  this.action = action;
  this.numArgs = numArgs;
}

Command.prototype.getMatches = function (string) {
  var index = index || 1; // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
      matches.push(match[index]);
  }
  return matches;
}

var commands = [
  {
    pattern: new RegExp('quit|q'),
    action: function() {
      process.exit();
    }
  },
  {
    pattern: new RegExp('^ls$'),
    action: function() {
      console.log("Display all sequences");
    }
  },
  {
    pattern: new RegExp('^la$'),
    action: function() {
      console.log("Display active sequences");
    }
  },
  {
    pattern: new RegExp('^li$'),
    action: function() {
      console.log("Display inactive sequences");
    }
  },
  {
    pattern: new RegExp('^pl$'),
    action: function() {
      outputSuccess('play all');
      Sequencer.playAll();
    }
  },
  {
    pattern: new RegExp('^pl (\d+)$'),
    action: function() {
      outputSuccess('play one');
    }
  },
  {
    pattern: new RegExp('^a$'),
    action: function() {
      Sequencer.addSequence("BD SD");
      Sequencer.playAll();
    }
  },
  {
    pattern: new RegExp('^pa$'),
    action: function() {
      Sequencer.pauseAll();
    }
  }

];
  
function isValidCommand(command) {
  for (var i = 0; i < commands.length; i++) {
    if(commands[i].pattern.test(command)) {
      return true;
    }
  }
  return false;
};

function main() {
  var readline = require('readline'),
      rl = readline.createInterface(process.stdin, process.stdout);

  console.log("Welcome to Clyde! Type 'help' to get started");


  rl.setPrompt('Clide > ');
  rl.prompt();

  rl.on('line', function(line) {
    switch(line.trim()) {
      case 'hello':
        console.log('world!');
        break;
      default:
        console.log('Say what? I might have heard `' + line.trim() + '`');
        break;
    }
    rl.prompt();
  }).on('close', function() {
    console.log('\nGoodbye!');
    process.exit(0);
  });
}
module.exports = Command;