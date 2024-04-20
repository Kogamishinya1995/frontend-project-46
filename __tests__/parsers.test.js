import { parseData } from '../src/parsers';

describe('parseData function', () => {
  test('should parse JSON data correctly', () => {
    const jsonData = '{"key": "value"}';
    const parsedData = parseData(jsonData, '.json');
    expect(parsedData).toEqual({ key: 'value' });
  });

  test('should parse YAML data correctly', () => {
    const yamlData = 'key: value';
    const parsedData = parseData(yamlData, '.yaml');
    expect(parsedData).toEqual({ key: 'value' });
  });

  test('should throw an error for unsupported file formats', () => {
    const unsupportedData = 'unsupported data';
    const parseUnsupported = () => parseData(unsupportedData, '.txt');
    expect(parseUnsupported).toThrow('Unsupported file format');
  });
});