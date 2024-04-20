import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { parseData } from './parsers.js';

export const gendiff = (filepath1, filepath2) => {
    const fileData1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
    const fileData2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  
    const parsedData1 = parseData(fileData1, path.extname(filepath1));
    const parsedData2 = parseData(fileData2, path.extname(filepath2));
  
    const diff = generateDiff(parsedData1, parsedData2);
    const formattedDiff = formatDiff(diff);
    console.log(formattedDiff);
  };
  
  const generateDiff = (data1, data2) => {
    const buildDiffItem = (key, value, status) => ({ key, value, status });
  
    const combineData = _.union(Object.keys(data1), Object.keys(data2));
  
    return combineData.map((key) => {
      const value1 = data1[key];
      const value2 = data2[key];
  
      if (!_.has(data1, key)) {
        return buildDiffItem(key, value2, '+');
      }
  
      if (!_.has(data2, key)) {
        return buildDiffItem(key, value1, '-');
      }
  
      if (_.isEqual(value1, value2)) {
        return buildDiffItem(key, value1, ' ');
      }
  
      return buildDiffItem(key, value2, '+');
    });e
  };
  
  const formatDiff = (diff) => {
    return diff.map(({ key, value, status }) => {
      const formattedValue = value instanceof Object ? '[complex value]' : `'${value}'`;
      return `  ${status} ${key}: ${formattedValue}`;
    }).join('\n');
  };