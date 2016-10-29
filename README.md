# Dotbars

Use Handlebars to generate dotfiles

## usage

```sh
npm install dotbars
```

```js
const dotbars = require('dotbars').default;

const template = dotbars`
digraph G {
  {{#each list}}
    {{this}} -> t;
  {{/each}}
}
`;

console.log(template({
  list: [
    'a1',
    'b1',
    'c1'
  ]
}));
```

```sh
node file.js | dot -Tpng > out.png
```



```js
const Dotbars = require('dotbars').Dotbars;

// create a fresh dotbars, allowing us to safely register helpers/partials but
// only for this insance of dotbars

const dotbars = new Dotbars();

dotbars.registerHelper('foo', () => 'something');

let template = dotbars.compile(`
digraph G {
  {{#each list}}
    {{this}} -> t;
  {{/each}}
}
`);

console.log(template({
  deps: [
    'a1',
    'b1',
    'c1'
  ]
}));
```
