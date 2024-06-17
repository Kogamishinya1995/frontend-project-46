import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const formatDiff = (diff, path = '') => {
  const entries = Object.entries(diff)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .flatMap(([key, { status, value, value1, value2, children }]) => {
      const currentPath = path ? `${path}.${key}` : key;

      switch (status) {
        case 'added':
          return [`Property '${currentPath}' was added with value: ${formatValue(value)}`];
        case 'removed':
          return [`Property '${currentPath}' was removed`];
        case 'updated':
          return [`Property '${currentPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`];
        case 'nested':
          const nestedDiff = formatDiff(children, currentPath);
          return nestedDiff.length > 0 ? nestedDiff : [];
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown status: ${status}`);
      }
    });

  return entries.join('\n');
};

export default formatDiff;