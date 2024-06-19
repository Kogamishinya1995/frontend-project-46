import _ from 'lodash';

const makeNode = (status, value1 = null, value2 = null, children = null) => ({
  status,
  value1,
  value2,
  children,
});

const calculateDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  return keys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      return { ...acc, [key]: makeNode('added', null, data2[key]) };
    }
    if (!_.has(data2, key)) {
      return { ...acc, [key]: makeNode('removed', data1[key], null) };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { ...acc, [key]: makeNode('nested', null, null, calculateDiff(data1[key], data2[key])) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return { ...acc, [key]: makeNode('updated', data1[key], data2[key]) };
    }
    return { ...acc, [key]: makeNode('unchanged', data1[key], null) };
  }, {});
};

export default calculateDiff;
