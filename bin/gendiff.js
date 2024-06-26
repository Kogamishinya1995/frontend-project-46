#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/gendiff.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    gendiff(filepath1, filepath2, format);
  });

program.parse(process.argv);
