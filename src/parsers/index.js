import yaml from 'js-yaml';

const parsers = {
  '.json': (data) => JSON.parse(data),
  '.yaml': (data) => yaml.load(data),
  '.yml': (data) => yaml.load(data),
};

export default function parseData(data, extension) {
  const parser = parsers[extension];
  if (parser) {
    return parser(data);
  }
  throw new Error('Unsupported file format');
}
