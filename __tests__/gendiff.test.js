import { gendiff } from '../src/gendiff';

const file1 = 'file1.json';
const file2 = 'file2.json';

const expectedDiff = `
  - key1: 'value1'
  + key2: 'value2'
`;

test('compare two flat JSON files', () => {
  gendiff(file1, file2);

  expect(formattedDiff).toEqual(expectedDiff);
});