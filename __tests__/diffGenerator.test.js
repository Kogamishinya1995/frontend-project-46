import generateDiff from '../src/diffGenerator'; 

test('generateDiff - should identify updated, removed and added values', () => {  
  const data1 = { 
    key1: 'value1',    key2: 123, 
    key3: { nestedKey: 'nestedValue' },  
  }; 
  const data2 = { 
    key1: 'value1',    key2: 456, 
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
