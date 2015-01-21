var reader = require('./command-reader'),
    readline = require('readline');

var welcomeString = 
   ['Welcome to Clide! Use the commands to play sequences.',
    'Here are the commands:',
    'quit, q - quit',
    'ls - list sequences',
    'la - list active sequences',
    'li - list unactive sequences',
    '',
    'pl [i] - play sequences (or ith if specified)',
    'pa [i] - pause sequences (or ith if specified)',
    '',
    'clear - remove all sequences ',
    'rm [i] - removes ith sequence',
    '',
    'ss [i] time: in ms - set speed for ith sequence',
    '',
    'a [sequence_string] - add new sequence',
    '(sequence strings are composed of sample names ','separated by spaces)',
    '',
    'Available samples (not case sensitive): ',
    '* BD - bass drum',
    '* SD - snare drum',
    '* HH - high hat',
    '* HT - high tom',
    '* LT - low tom',
    '* CY - cymbal',
    '* ,  - rest',
   ].join('\n');

function main() {
  var rl = readline.createInterface(process.stdin, process.stdout);

  console.log(welcomeString);
  rl.setPrompt('Clide > ');
  rl.prompt();

  rl.on('line', function(line) {
    line = line.trim();
    reader.execute(line);
    rl.prompt();
  }).on('close', function() {
    console.log('\nGoodbye!');
    process.exit(0);
  });
}

main();