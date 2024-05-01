import _ from 'lodash';

const formatDiff = (diff, depth = 1) => { 
    if (!_.isObject(diff)) { 
      return `${diff}`; 
    } 
   
    const indentSize = 4; 
    const indent = ' '.repeat(indentSize * depth); 
    const bracketIndent = ' '.repeat(indentSize * (depth - 1)); 
   
    const lines = Object.entries(diff).flatMap(([key, value]) => { 
      if (_.isObject(value)) { 
        return [ 
          `${indent}  ${key}: {`, 
          `${formatDiff(value, depth + 1)}`, 
          `${bracketIndent}  }`, 
        ]; 
      } 
   
      return `${indent}  ${key}: ${value}`; 
    }); 
   
    return `{\n${lines.join('\n')}\n${bracketIndent}}`; 
  }; 
   
  export default formatDiff; 