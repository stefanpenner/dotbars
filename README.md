# Dotbars

Use Handlebars to generate dotfiles

## usage

```sh
npm install dotbars
```

```js
const dotbars = require('dotbars');

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
