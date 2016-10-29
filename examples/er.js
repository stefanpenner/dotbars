const Dotbars = require('../').Dotbars;
const fs = require('fs');

let dotbars = new Dotbars();
const template = dotbars.compile(fs.readFileSync(__dirname + '/er.dot', 'UTF8'));

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
