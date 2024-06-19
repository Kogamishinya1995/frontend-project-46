import _ from 'lodash';

const calculateDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  return keys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      return { ...acc, [key]: { status: 'added', value: data2[key] } };
    } if (!_.has(data2, key)) {
      return { ...acc, [key]: { status: 'removed', value: data1[key] } };
    } if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { ...acc, [key]: { status: 'nested', children: calculateDiff(data1[key], data2[key]) } };
    } if (!_.isEqual(data1[key], data2[key])) {
      return { ...acc, [key]: { status: 'updated', value1: data1[key], value2: data2[key] } };
    }
    return { ...acc, [key]: { status: 'unchanged', value: data1[key] } };
  }, {});
};

export default calculateDiff;
