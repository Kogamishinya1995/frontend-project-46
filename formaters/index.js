import stylish from './stylish.js';
import plain from './plain.js';
import toJSON from './json.js';

const formatters = {
  stylish,
  plain,
  json: toJSON,
};

export default formatters;
