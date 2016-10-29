const Dotbars = require('../').Dotbars;
const fs = require('fs');

let dotbars = new Dotbars();

dotbars.registerHelper('arrow-for-edge', function(edge) {
  let arrow = REL_TYPE_TO_ARROW[edge.kind] || {
    tail: 'none',
    head: 'none'
  };

  return `arrowtail=${arrow.tail} arrowhead=${arrow.head}`
});

const template = dotbars.compile(fs.readFileSync(__dirname + '/er.dot', 'UTF8'));

const nodes = [
  {
    name: 'common/me',
    properties: [
      { name: 'miniProfile', kind: 'belongs-to'},
      { name: 'publicContactInfo', kind: 'attribute', label: '{...}'}
    ]
  },

  {
    name: 'identity/shared/mini-profile',
    properties: [
      { name: 'picture',         kind: 'attribute', label: '{...}'},
      { name: 'backgroundImage', kind: 'attribute', label: '{...}'}
    ]
  }
];

const edges = [
  {
    from: {
      node: 'common/me',
      property: 'miniProfile'
    },
    kind: 'belongs-to',
    to: {
      node: 'identity/shared/mini-profile',
      property: '*'
    }
  }
];

const REL_TYPE_TO_ARROW = {
  'belongs-to': { head: 'tee',   tail: 'none' },
  'has-many':   { head: 'crow',  tail: 'none' }
};

console.log(template({
  nodes,
  edges
}));
