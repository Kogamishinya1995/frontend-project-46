import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const formatDiff = (diff, path = '') => {
  const entries = Object.entries(diff).flatMap(([key, {
    status, value, value1, value2, children,
  }]) => {
    const currentPath = path ? `${path}.${key}` : key;

    switch (status) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed with value: ${formatValue(value)}`;
      case 'updated':
        return `Property '${currentPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
      case 'nested':
        return formatDiff(children, currentPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  });

  return entries.join('\n');
};

export default formatDiff;
