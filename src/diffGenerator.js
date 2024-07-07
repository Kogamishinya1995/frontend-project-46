import _ from 'lodash';

const makeNode = ({
  type, value, value2, children,
}) => {
  const base = {
    type,
  };

  if (value !== undefined) {
    base.value = value;
  }

  if (value2 !== undefined) {
    base.value2 = value2;
  }

  if (children !== undefined) {
    base.children = children;
  }

  return base;
};

const calculateDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  return keys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      return [...acc, makeNode({ type: 'added', value: data2[key] })];
    }
    if (!_.has(data2, key)) {
      return [...acc, makeNode({ type: 'removed', value: data1[key] })];
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return [...acc, makeNode({ type: 'nested', children: calculateDiff(data1[key], data2[key]) })];
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return [...acc, makeNode({ type: 'updated', value: data1[key], value2: data2[key] })];
    }
    return [...acc, makeNode({ type: 'unchanged', value: data1[key] })];
  }, []);
};

export default calculateDiff;