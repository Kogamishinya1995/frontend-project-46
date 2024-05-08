import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const formatDiff = (diff, path = '') => {
  const entries = Object.entries(diff).flatMap(([key, { status, value, value1, value2, children }]) => {
    const currentPath = path ? `${path}.${key}` : key;

    switch (status) {
      case 'added':
        return `- Property '${currentPath}' was added with value: ${formatValue(value)}`;
      case 'removed':
        return `- Property '${currentPath}' was removed`;
      case 'updated':
        return `- Property '${currentPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
      case 'nested':
        return formatDiff(children, currentPath).map(entry => `  ${entry}`);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  });

  return [
    ...entries.filter(entry => !Array.isArray(entry)).flatMap(entry => entry.split('\n')),
    ...entries.flatMap(entry => (Array.isArray(entry) ? entry : [])),
  ].join('\n');
};

export default formatDiff;
