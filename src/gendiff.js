const { program } = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .parse(process.argv);

if (program.help) {
  program.outputHelp();
}

const diff = genDiff(filepath1, filepath2);
console.log(diff);

export default diff;