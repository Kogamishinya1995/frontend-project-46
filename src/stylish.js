const formatDiff = (diff, depth = 1) => {     
    if (!diff) {
        return '';
    }

    const indentSize = 4;     
    const indent = ' '.repeat(depth * indentSize);     
       
    const stylishFormat = diff.map(({ key, value, status, children }) => {     
      const formattedValue = value instanceof Object ? formatDiff(children, depth + 1) : value;     
      switch (status) {     
        case '+':     
          return `${indent}+ ${key}: ${formattedValue}`;     
        case '-':     
          return `${indent}- ${key}: ${formattedValue}`;     
        case ' ':     
          return `${indent}  ${key}: ${formattedValue}`;     
        default:     
          throw new Error('Unknown status');     
      }     
    });
  
    return `{\n${stylishFormat.join('\n')}\n${' '.repeat((depth - 1) * indentSize)}}`;
};
  
export default formatDiff;