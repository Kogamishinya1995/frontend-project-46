import _ from 'lodash';

const generateDiff = (data1, data2) => {
    const buildDiffItem = (key, value, status) => ({ key, value, status });
    const allKeys = _.union(Object.keys(data1), Object.keys(data2));

    return allKeys.map((key) => {
        if (!_.has(data1, key)) {
            return buildDiffItem(key, data2[key], '+');
        }
        if (!_.has(data2, key)) {
            return buildDiffItem(key, data1[key], '-');
        }
        if (_.isEqual(data1[key], data2[key])) {
            return buildDiffItem(key, data1[key], ' ');
        }
        if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
            return buildDiffItem(key, generateDiff(data1[key], data2[key]), ' ');
        }
        return buildDiffItem(key, data2[key], '+');
    });
};

export default generateDiff;