import yaml from 'js-yaml';

export const parseData = (data, extension) => {
  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(data);
  }
  throw new Error('Unsupported file format');
};
