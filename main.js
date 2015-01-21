var reader = require('./command-reader');

var welcomeString = 
   ['Welcome to Clide! Use the commands to play sequences.',
    '[Type "quit" or "q" to quit]"',
    'Here are the commands:'
   ].join('\n');

function main() {
  var readline = require('readline'),
      rl = readline.createInterface(process.stdin, process.stdout);

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