import _ from 'lodash';

  const formatDiff = (diff, depth = 1) => {
    if (!_.isObject(diff)) {
        return `${diff}`;
    }

    const indentSize = 2; // количество отступов для каждого уровня вложенности
    const indentChar = '.'; // символ для формирования отступов
    const specialChar = '+'; // специальный символ
    const indent = `${indentChar.repeat(indentSize * depth)}`; // формирование отступа
    const bracketIndent = `${indentChar.repeat(indentSize * (depth - 1))}`; // отступ для закрывающей скобки

    const lines = Object.entries(diff).flatMap(([key, value]) => {
        if (_.isObject(value)) {
            return [
                `${indent}${key}: {`,
                `${formatDiff(value, depth + 1)}`,
                `${bracketIndent}}`,
            ];
        }

        const special = depth > 1 ? `${specialChar} ` : ''; // проверка на специальный символ
        return `${indent}${special}${key}: ${value}`;
    });

    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

export default formatDiff; 