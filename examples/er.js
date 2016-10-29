const dotbars = require('../').default;

const template = dotbars`
digraph models_diagram {
  graph[rankdir=LR, concentrate=true, overlap=false, splines=true];

  node [shape="record" fontsize=9 fontname="Verdana" margin=0];
  edge [dir="both" arrowsize=0.8];

{{#each entities}}
  "{{name}}"[shape=none margin=0 label=<
    <table border="1" cellborder="0" cellspacing="0" cellpadding="4">
      <tr><td border="0" port="*" bgcolor="lightgray">{{name}}</td></tr>
      {{#each relationships}}
        <tr><td border="0" port="{{name}}" align="left">.{{name}}</td></tr>
      {{/each}}
      {{#each attributes}}
        <tr><td border="0" port="{{name}}" align="left">.{{name}}: { {{type}} }</td></tr>
      {{/each}}
    </table>>
  ];
{{/each}}


  {{#each relationships}}
    "{{source}}":"{{name}}" -> "{{target}}":"*" [arrowtail=odot arrowhead=tee]
  {{/each}}
}
`;

const entities = [
  {
    name: 'common/me',
    relationships: [
      { name: 'miniProfile', target: 'identity/shared/mini-profile', type: 'belongs-to' }
    ],
    attributes: [
      { name: 'publicContactInfo', type: '...' }
    ]
  },

  {
    name: 'identity/shared/mini-profile',
    attributes: [
      { name: 'picture', type: '...' },
      { name: 'backgroundImage', type: '...' }
    ]
  }
];

function relationshipsFor(entities) {
  const relationships = [];

  entities.forEach(entity => {
    if (Array.isArray(entity.relationships)) {
    entity.relationships.forEach(rel => {
      relationships.push({
        source: entity.name,
        name: rel.name,
        target: rel.target
      });
    });
    }
  });

  return relationships;
}
// TODO:
//   * load from seperate file
//   * extract edges based on whole-graph analsis, so we can correctly array the edge
console.log(template({
  entities,
  relationships: relationshipsFor(entities)
}));
