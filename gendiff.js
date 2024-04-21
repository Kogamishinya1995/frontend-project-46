#!/usr/bin/env node

import { program } from 'commander';
import { gendiff } from './src/gendiff.js';

program
  .option('-f, --format [type]', 'output format', 'stylish') // Устанавливаем форматер stylish по умолчанию
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    gendiff(filepath1, filepath2);
  });

program.parse(process.argv);