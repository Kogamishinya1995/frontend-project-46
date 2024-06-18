import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatDiff = (diff, path = '') => {
  const entries = _.sortBy(Object.entries(diff), ([key]) => key)
    .flatMap(([key, {
      status, value, value1, value2, children,
    }]) => {
      const currentPath = path ? `${path}.${key}` : key;
      let result;
      switch (status) {
        case 'added':
          result = `Property '${currentPath}' was added with value: ${formatValue(value)}`;
          break;
        case 'removed':
          result = `Property '${currentPath}' was removed`;
          break;
        case 'updated':
          result = `Property '${currentPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
          break;
        case 'nested':
          const nestedDiff = formatDiff(children, currentPath);
          result = nestedDiff.length > 0 ? nestedDiff : [];
          break;
        case 'unchanged':
          result = [];
          break;
        default:
          throw new Error(`Unknown status: ${status}`);
      }
      return result;
    });
  return entries.join('\n');
};

export default formatDiff;
