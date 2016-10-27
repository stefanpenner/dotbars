const dotbars = require('./');

const template = dotbars`
digraph G {
  {{#each list}}
    {{this}} -> t;
  {{/each}}
}
`;

console.log(template({
  title: 'hi',
  body: 'body',
  list: [
    'a1',
    'b1',
    'c1'
  ]
}));
