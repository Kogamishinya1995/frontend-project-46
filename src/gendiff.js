import fs from 'fs';
import path from 'path';

export const gendiff = (filepath1, filepath2) => {
    const fileData1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
    const fileData2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

    const parsedData1 = parseData(fileData1, path.extname(filepath1));
    const parsedData2 = parseData(fileData2, path.extname(filepath2));

    console.log(parsedData1, parsedData2);
};

const parseData = (data, extension) => {
    if (extension === '.json') {
        return JSON.parse(data);
    } else {
        throw new Error('Unsupported file format');
    }
};