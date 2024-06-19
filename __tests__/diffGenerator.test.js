import YAML from 'js-yaml';
import calculateDiff from '../src/diffGenerator';

describe('calculateDiff', () => {
  it('should correctly calculate the difference between two flat objects', () => {
    const data1 = { name: 'John', age: 30, city: 'New York' };
    const data2 = { name: 'John', age: 35, city: 'San Francisco' };

    const expectedDiff = {
      name: {
        status: 'unchanged', value1: 'John', value2: null, children: null,
      },
      age: {
        status: 'updated', value1: 30, value2: 35, children: null,
      },
      city: {
        status: 'updated', value1: 'New York', value2: 'San Francisco', children: null,
      },
    };

    const diff = calculateDiff(data1, data2);
    expect(diff).toEqual(expectedDiff);
  });

  it('should correctly calculate the difference between two nested objects', () => {
    const data1 = { name: 'John', address: { street: '123 Main St', city: 'New York' } };
    const data2 = { name: 'John', address: { street: '123 Main St', city: 'San Francisco' } };

    const expectedDiff = {
      name: {
        status: 'unchanged', value1: 'John', value2: null, children: null,
      },
      address: {
        status: 'nested',
        value1: null,
        value2: null,
        children: {
          street: {
            status: 'unchanged', value1: '123 Main St', value2: null, children: null,
          },
          city: {
            status: 'updated', value1: 'New York', value2: 'San Francisco', children: null,
          },
        },
      },
    };

    const diff = calculateDiff(data1, data2);
    expect(diff).toEqual(expectedDiff);
  });

  it('should correctly calculate the difference between two JSON objects', () => {
    const obj1 = { name: 'John', age: 30, city: 'New York' };
    const obj2 = { name: 'John', age: 35, city: 'San Francisco' };

    const expectedDiff = {
      name: {
        status: 'unchanged', value1: 'John', value2: null, children: null,
      },
      age: {
        status: 'updated', value1: 30, value2: 35, children: null,
      },
      city: {
        status: 'updated', value1: 'New York', value2: 'San Francisco', children: null,
      },
    };

    const diff = calculateDiff(obj1, obj2);
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

    const obj1 = YAML.load(yamlData1);
    const obj2 = YAML.load(yamlData2);

    const expectedDiff = {
      name: {
        status: 'unchanged', value1: 'John', value2: null, children: null,
      },
      age: {
        status: 'updated', value1: 30, value2: 35, children: null,
      },
      city: {
        status: 'updated', value1: 'New York', value2: 'San Francisco', children: null,
      },
    };

    const diff = calculateDiff(obj1, obj2);
    expect(diff).toEqual(expectedDiff);
  });
});
