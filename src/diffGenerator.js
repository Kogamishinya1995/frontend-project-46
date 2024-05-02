import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const diff = keys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      acc[key] = { status: 'added', value: data2[key] };
    } else if (!_.has(data2, key)) {
      acc[key] = { status: 'removed', value: data1[key] };
    } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      acc[key] = { status: 'nested', children: generateDiff(data1[key], data2[key]) };
    } else if (!_.isEqual(data1[key], data2[key])) {
      acc[key] = { status: 'updated', value1: data1[key], value2: data2[key] };
    } else {
      acc[key] = { status: 'unchanged', value: data1[key] };
    }
    return acc;
  }, {});
  return diff;
};

export default generateDiff;
