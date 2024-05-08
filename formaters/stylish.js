import _ from 'lodash';

const formatValue = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value).sort();
    const indentSize = 4;
    const indentStr = ' '.repeat(indentSize * depth - 2);
    const formattedEntries = keys.map((key) => `${indentStr}  ${key}: ${formatValue(value[key], depth + 1)}`);
    return `{\n${formattedEntries.join('\n')}\n${indentStr}  }`;
  }
  return value;
};

const formatDiff = (diff, depth = 1) => {
  const keys = Object.keys(diff).sort();
  const indentSize = 4;
  const indentStr = ' '.repeat(indentSize * depth - 2);
  const formattedEntries = keys.map((key) => {
    const {
      status, value, value1, value2, children,
    } = diff[key];
    switch (status) {
      case 'added':
        return `${indentStr}+ ${key}: ${formatValue(value, depth + 1)}`;
      case 'removed':
        return `${indentStr}- ${key}: ${formatValue(value, depth + 1)}`;
      case 'updated':
        return [`${indentStr}- ${key}: ${formatValue(value1, depth + 1)}`, `${indentStr}+ ${key}: ${formatValue(value2, depth + 1)}`];
      case 'nested':
        return `${indentStr}  ${key}: ${formatDiff(children, depth + 1)}`;
      case 'unchanged':
        return `${indentStr}  ${key}: ${formatValue(value, depth + 1)}`;
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }).flat();
  return `{\n${formattedEntries.join('\n')}\n${indentStr}}`;
};

export default formatDiff;

