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
      type, value, value2, children,
    }]) => {
      const currentPath = path ? `${path}.${key}` : key;
      switch (type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${formatValue(value)}`;
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'updated':
          return `Property '${currentPath}' was updated. From ${formatValue(value)} to ${formatValue(value2)}`;
        case 'nested': {
          const nestedDiff = formatDiff(children, currentPath);
          return nestedDiff.length > 0 ? nestedDiff : [];
        }
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown status: ${type}`);
      }
    });
  return entries.join('\n');
};

export default formatDiff;
