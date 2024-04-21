const formatDiff = (diff, depth = 1) => {
    if (!diff) {
        return '';
    }
      
    const indentSize = 4;
    const indent = ' '.repeat((depth - 1) * indentSize);
      
    const stylishFormat = diff.map(({ key, value, status, children }) => {
        const formattedValue = value instanceof Object ? formatDiff(children, depth + 1) : value;
        const formattedKey = `${indent}  ${key}: ${formattedValue}`;
          
        switch (status) {
            case '+':
                return `${indent}+ ${formattedKey}`;
            case '-':
                return `${indent}- ${formattedKey}`;
            case ' ':
                return `${indent}  ${formattedKey}`;
            default:
                throw new Error('Unknown status');
        }
    });

    return `{${'\n'}${stylishFormat.join('\n')}\n${' '.repeat((depth - 1) * indentSize)}}`;
};
  
export default formatDiff;