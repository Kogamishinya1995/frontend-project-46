import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const diff = keys.reduce((acc, key) => {
    // Создаем новый объект для acc вместо его изменения
    const newAcc = { ...acc };
    if (!_.has(data1, key)) {
      newAcc[key] = { status: 'added', value: data2[key] };
    } else if (!_.has(data2, key)) {
      newAcc[key] = { status: 'removed', value: data1[key] };
    } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      newAcc[key] = { status: 'nested', children: generateDiff(data1[key], data2[key]) };
    } else if (!_.isEqual(data1[key], data2[key])) {
      newAcc[key] = { status: 'updated', value1: data1[key], value2: data2[key] };
    } else {
      newAcc[key] = { status: 'unchanged', value: data1[key] };
    }
    return newAcc;
  }, {});
  return diff;
};

export default generateDiff;
