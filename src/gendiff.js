import fs from 'fs';
import path from 'path';
import parseData from './parsers/index.js';
import formatters from '../formaters/index.js';
import calculateDiff from './calculateDiff.js';

export default function gendiff(filepath1, filepath2, format = 'stylish') {
  const fileData1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const fileData2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const parsedData1 = parseData(fileData1, path.extname(filepath1));
  const parsedData2 = parseData(fileData2, path.extname(filepath2));
  const diff = calculateDiff(parsedData1, parsedData2);
  const formatter = formatters[format];
  const formattedDiff = formatter(diff);
  console.log(formattedDiff);
  return formattedDiff;
}
