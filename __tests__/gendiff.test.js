import { generateDiff, formatDiff } from '../src/gendiff';

describe('generateDiff function', () => {
  test('should generate the difference between two objects', () => {
    const obj1 = { key1: 'value1', key2: 'value2' };
    const obj2 = { key2: 'newvalue2', key3: 'value3' };
    const diff = generateDiff(obj1, obj2);
    expect(diff).toEqual([
      { key: 'key1', value: 'value1', status: '-' },
      { key: 'key2', value: 'newvalue2', status: '+' },
      { key: 'key3', value: 'value3', status: '+' },
    ]);
  });
});

describe('formatDiff function', () => {
  test('should format the difference array correctly', () => {
    const diff = [
      { key: 'key1', value: 'value1', status: '-' },
      { key: 'key2', value: 'newvalue2', status: '+' },
    ];
    const formattedDiff = formatDiff(diff);
    expect(formattedDiff).toEqual('- key1: value1\n+ key2: newvalue2');
  });
});