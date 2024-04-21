import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { parseData } from './parsers.js';
import formatDiff from './stylish.js'; // Импорт форматера stylish

export const gendiff = (filepath1, filepath2) => {
    const fileData1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
    const fileData2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

    const parsedData1 = parseData(fileData1, path.extname(filepath1));
    const parsedData2 = parseData(fileData2, path.extname(filepath2));

    const diff = generateDiff(parsedData1, parsedData2);
    const formattedDiff = formatDiff(diff); // stylish для форматирования различий
    console.log(formattedDiff);
};

const generateDiff = (data1, data2) => {
    const buildDiffItem = (key, value, status) => ({ key, value, status });

    const allKeys = _.union(Object.keys(data1), Object.keys(data2));

    return allKeys.map((key) => {
        if (!_.has(data1, key)) {
            return buildDiffItem(key, data2[key], '+');
        }
        if (!_.has(data2, key)) {
            return buildDiffItem(key, data1[key], '-');
        }
        if (_.isEqual(data1[key], data2[key])) {
            return buildDiffItem(key, data1[key], ' ');
        }
        if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
            return buildDiffItem(key, generateDiff(data1[key], data2[key]), ' ');
        }
        return buildDiffItem(key, data2[key], '+');
    });
};