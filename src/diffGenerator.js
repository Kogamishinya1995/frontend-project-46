import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const buildDiffItem = (key, value, status) => ({ key, value, status });
  const allKeys = _.union(_.keys(data1), _.keys(data2));

  const diffItems = allKeys.flatMap((key) => {
    if (!_.has(data1, key)) {
      return buildDiffItem(key, data2[key], '+');
    }
    if (!_.has(data2, key)) {
      return buildDiffItem(key, data1[key], '-');
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return buildDiffItem(key, generateDiff(data1[key], data2[key]), ' ');
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return [
        buildDiffItem(key, data1[key], '-'),
        buildDiffItem(key, data2[key], '+'),
      ];
    }
    return buildDiffItem(key, data1[key], ' ');
  });

  return diffItems;
};

export default generateDiff;

//вместо + и - просто данные, текстом. типа "без изменений" "что-то добавилось". 
// статус и по статусу смотреть что отрисовывать в стулише
