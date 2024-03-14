#!/usr/bin/env node

import { program } from 'commander';

program
  .version('здесь будет выводиться версия')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information')
  .action((opt) => {
    if (opt.help) {
      program.help();
    }

  });

program.parse(process.argv);