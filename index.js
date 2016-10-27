const Handlebars = require('handlebars');

module.exports = function(parts, ...variables) {
  let result = '';
  for (let i = 0; i < parts.length; i++) {
    result += parts[i];
    result += variables[i] || '';
  }

  const instance = Handlebars.create()
  return  instance.compile(result);
};
