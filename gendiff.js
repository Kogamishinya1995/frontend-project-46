#!/usr/bin/env node

import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information')
  .parse(process.argv);

if (program.help) {
  console.log('Usage: gendiff [options]');
  console.log('');
  console.log('Compares two configuration files and shows a difference.');
}