import _ from 'lodash';

const formatValue = (value, depth) => {
  if (_.isObject(value)) {
    const keys = _.sortBy(Object.keys(value));
    const indentSize = 4;
    const indentStr = ' '.repeat(indentSize * depth - 2);
    const formattedEntries = keys.map((key) => `${indentStr}  ${key}: ${formatValue(value[key], depth + 1)}`);
    return `{\n${formattedEntries.join('\n')}\n${indentStr.slice(0, -2)}}`;
  }
  return value;
};

const formatDiff = (diff, depth = 1) => {
  const keys = _.sortBy(Object.keys(diff));
  const indentSize = 4;
  const indentStr = ' '.repeat(indentSize * depth - 2);
  const formattedEntries = keys.map((key) => {
    const { type, value, value2, children } = diff[key];
    switch (type) {
      case 'added':
        return `${indentStr}+ ${key}: ${formatValue(value, depth + 1)}`;
      case 'removed':
        return `${indentStr}- ${key}: ${formatValue(value, depth + 1)}`;
      case 'updated':
        return [
          `${indentStr}- ${key}: ${formatValue(value, depth + 1)}`,
          `${indentStr}+ ${key}: ${formatValue(value2, depth + 1)}`,
        ];
      case 'nested':
        return `${indentStr}  ${key}: ${formatDiff(children, depth + 1)}`;
      case 'unchanged':
        return `${indentStr}  ${key}: ${formatValue(value, depth + 1)}`;
      default:
        throw new Error(`Unknown status: ${type}`);
    }
  }).flat();
  return `{\n${formattedEntries.join('\n')}\n${indentStr.slice(0, -2)}}`;
};

export default formatDiff;
