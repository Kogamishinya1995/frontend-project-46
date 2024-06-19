import generateDiff from '../src/diffGenerator';
import parseData from '../src/parsers/index.js';

test('generateDiff - should identify updated, removed and added values', () => {
  const data1 = {
    key1: 'value1',
    key2: 123,
    key3: { nestedKey: 'nestedValue' },
  };
  const data2 = {
    key1: 'value1',
    key2: 456,
    key4: 'value4',
  };
  const diff = generateDiff(data1, data2);
  const expectedDiff = {
    key1: { status: 'unchanged', value: 'value1' },
    key2: { status: 'updated', value1: 123, value2: 456 },
    key3: { status: 'removed', value: { nestedKey: 'nestedValue' } },
    key4: { status: 'added', value: 'value4' },
  };
  expect(diff).toEqual(expectedDiff);
});
test('generateDiff - should handle flat objects with the same keys', () => {
  const data1 = { key1: 'value1', key2: 'value2' };
  const data2 = { key1: 'value1', key2: 'value2_updated' };
  const diff = generateDiff(data1, data2);
  const expectedDiff = {
    key1: { status: 'unchanged', value: 'value1' },
    key2: { status: 'updated', value1: 'value2', value2: 'value2_updated' },
  };
  expect(diff).toEqual(expectedDiff);
});
test('generateDiff - should handle nested objects', () => {
  const data1 = {
    key1: 'value1',
    key2: {
      nestedKey1: 'nestedValue1',
      nestedKey2: 'nestedValue2',
    },
  };
  const data2 = {
    key1: 'value1',
    key2: {
      nestedKey1: 'nestedValue1_updated',
      nestedKey3: 'nestedValue3',
    },
  };
  const diff = generateDiff(data1, data2);
  const expectedDiff = {
    key1: { status: 'unchanged', value: 'value1' },
    key2: {
      status: 'nested',
      children: {
        nestedKey1: { status: 'updated', value1: 'nestedValue1', value2: 'nestedValue1_updated' },
        nestedKey2: { status: 'removed', value: 'nestedValue2' },
        nestedKey3: { status: 'added', value: 'nestedValue3' },
      },
    },
  };
  expect(diff).toEqual(expectedDiff);
});
test('generateDiff - should handle when one of the objects is null', () => {
  const data1 = {
    key1: 'value1',
    key2: null,
  };
  const data2 = {
    key1: 'value1',
    key2: 'value2',
  };
  const diff = generateDiff(data1, data2);
  const expectedDiff = {
    key1: { status: 'unchanged', value: 'value1' },
    key2: { status: 'updated', value1: null, value2: 'value2' },
  };
  expect(diff).toEqual(expectedDiff);
});
test('generateDiff - should handle numbers', () => {
  const data1 = { key1: 123, key2: 0, key3: -123 };
  const data2 = { key1: 456, key2: 0, key3: -456 };
  const diff = generateDiff(data1, data2);
  const expectedDiff = {
    key1: { status: 'updated', value1: 123, value2: 456 },
    key2: { status: 'unchanged', value: 0 },
    key3: { status: 'updated', value1: -123, value2: -456 },
  };
  expect(diff).toEqual(expectedDiff);
});

test('generateDiff - should handle strings', () => {
  const data1 = { key1: 'hello', key2: ' ', key3: '!@#$%' };
  const data2 = { key1: 'world', key2: '\t', key3: '' };
  const diff = generateDiff(data1, data2);
  const expectedDiff = {
    key1: { status: 'updated', value1: 'hello', value2: 'world' },
    key2: { status: 'updated', value1: ' ', value2: '\t' },
    key3: { status: 'updated', value1: '!@#$%', value2: '' },
  };
  expect(diff).toEqual(expectedDiff);
});

test('generateDiff - should handle boolean values', () => {
  const data1 = { key1: true, key2: false };
  const data2 = { key1: false, key2: true };
  const diff = generateDiff(data1, data2);
  const expectedDiff = {
    key1: { status: 'updated', value1: true, value2: false },
    key2: { status: 'updated', value1: false, value2: true },
  };
  expect(diff).toEqual(expectedDiff);
});
test('generateDiff - should handle empty objects', () => {
  const data1 = {};
  const data2 = {};
  const diff = generateDiff(data1, data2);
  const expectedDiff = {};
  expect(diff).toEqual(expectedDiff);
});
describe('parseData', () => {
  it('should parse JSON data correctly', () => {
    const jsonData = '{"name": "John", "age": 30}';
    const parsedData = parseData(jsonData, '.json');
    expect(parsedData).toEqual({ name: 'John', age: 30 });
  });

  it('should parse YAML data correctly', () => {
    const yamlData = 'name: John\nage: 30';
    const parsedData = parseData(yamlData, '.yaml');
    expect(parsedData).toEqual({ name: 'John', age: 30 });
  });

  it('should throw an error for unsupported file format', () => {
    const unsupportedData = 'this is some other data format';
    expect(() => parseData(unsupportedData, '.txt')).toThrowError('Unsupported file format');
  });
});
describe('generateDiff', () => {
  it('should correctly calculate the difference between two JSON objects', () => {
    const obj1 = { name: 'John', age: 30, city: 'New York' };
    const obj2 = { name: 'John', age: 35, city: 'San Francisco' };
    const expectedDiff = {
      name: { status: 'unchanged', value: 'John' },
      age: { status: 'updated', value1: 30, value2: 35 },
      city: { status: 'updated', value1: 'New York', value2: 'San Francisco' },
    };
    const diff = generateDiff(obj1, obj2);
    expect(diff).toEqual(expectedDiff);
  });

  it('should correctly calculate the difference between two YAML objects', () => {
    const yamlData1 = `
    name: John
    age: 30
    city: New York
    `;
    const yamlData2 = `
    name: John
    age: 35
    city: San Francisco
    `;
    const obj1 = parseData(yamlData1, '.yaml');
    const obj2 = parseData(yamlData2, '.yaml');
    const expectedDiff = {
      name: { status: 'unchanged', value: 'John' },
      age: { status: 'updated', value1: 30, value2: 35 },
      city: { status: 'updated', value1: 'New York', value2: 'San Francisco' },
    };
    const diff = generateDiff(obj1, obj2);
    expect(diff).toEqual(expectedDiff);
  });
});
