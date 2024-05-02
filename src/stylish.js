import _ from 'lodash';

const formatValue = (value, depth) => {
  if (_.isObject(value)) {
    const indentSize = 4;
    const indentStr = ' '.repeat(indentSize * depth);
    const entries = Object.entries(value);
    const formattedEntries = entries.map(([key, val]) => `${indentStr}  ${key}: ${formatValue(val, depth + 1)}`);
    return `{\n${formattedEntries.join('\n')}\n${indentStr}}`;
  }
  return value;
};

const formatDiff = (diff, depth = 1) => {
  const indentSize = 4;
  const indentStr = ' '.repeat(indentSize * depth);
  const entries = Object.entries(diff);
  const formattedEntries = entries.map(([key, { status, value, value1, value2, children }]) => {
    switch (status) {
      case 'added':
        return `${indentStr}+ ${key}: ${formatValue(value, depth)}`;
      case 'removed':
        return `${indentStr}- ${key}: ${formatValue(value, depth)}`;
      case 'updated':
        return [`${indentStr}- ${key}: ${formatValue(value1, depth)}`, `${indentStr}+ ${key}: ${formatValue(value2, depth)}`];
      case 'nested':
        return `${indentStr}  ${key}: ${formatDiff(children, depth + 1)}`;
      case 'unchanged':
        return `${indentStr}  ${key}: ${formatValue(value, depth)}`;
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }).flat();
  return `{\n${formattedEntries.join('\n')}\n${indentStr.slice(0, -2)}}`;
};

export default formatDiff;