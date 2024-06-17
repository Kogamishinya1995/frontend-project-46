import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const formatDiff = (diff, path = '') => {
  return Object.entries(diff).flatMap(([key, { status, value, value1, value2, children }]) => {
    const currentPath = path ? `${path}.${key}` : key;

    switch (status) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed with value: ${formatValue(value)}`;
      case 'updated':
        return `Property '${currentPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
      case 'nested':
        const nestedDiff = formatDiff(children, currentPath);
        return nestedDiff ? `Property '${currentPath}' was updated. From ${nestedDiff.split('\n').join('\n')}` : [];
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }).join('\n');
};

export default formatDiff;
