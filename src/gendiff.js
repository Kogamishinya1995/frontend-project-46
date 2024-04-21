import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { parseData } from './parsers.js';
import formatDiff from './stylish.js';
import generateDiff from './diffGenerator.js';

export const gendiff = (filepath1, filepath2) => {
    const fileData1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
    const fileData2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
    const parsedData1 = parseData(fileData1, path.extname(filepath1));
    const parsedData2 = parseData(fileData2, path.extname(filepath2));
    const diff = generateDiff(parsedData1, parsedData2);
    const formattedDiff = formatDiff(diff);
    console.log(formattedDiff);
};