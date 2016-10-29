import Handlebars from 'handlebars';

export class Dotbars {
  constructor() {
    this._handlebars = Handlebars.create();
  }

  tag(parts, ...variables) {
    let result = '';
    for (let i = 0; i < parts.length; i++) {
      result += parts[i];
      result += variables[i] || '';
    }

    return this.compile(result);
  }

  registerHelper(name, fn) {
    this._handlebars.registerHelper(name, function() {
      return new Handlebars.HtmlSafeString(fn());
    });
  }

  registerPartial(name, partial) {
    this._handlebars.registerPartial(name, partial);
  }

  unregisterHelper(name) {
    this._handlebars.unregisterHelper(name);
  }

  unregisterPartial(name) {
    this._handlebars.unregisterPartial(name);
  }

  compile(template) {
    return this._handlebars.compile(template);
  }
}

const main = new Dotbars();

export default function dotbars(parts, ...variables) {
  return main.tag(...arguments);
}

dotbars.compile = function(template) {
  return main.compile(template);
}
