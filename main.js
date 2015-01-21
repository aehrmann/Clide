var reader = require('./command-reader');

function main() {
  var readline = require('readline'),
      rl = readline.createInterface(process.stdin, process.stdout);

  console.log("Welcome to Clide! Type 'help' to get started");


  rl.setPrompt('Clide > ');
  rl.prompt();

  rl.on('line', function(line) {
    line = line.trim();
    console.log('|| You typed: ' + line);
    reader.execute(line);
    rl.prompt();
  }).on('close', function() {
    console.log('\nGoodbye!');
    process.exit(0);
  });
}

main();