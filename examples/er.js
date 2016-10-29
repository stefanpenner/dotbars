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

const REL_TYPE_TO_ARROW = {
  'belongs-to': { head: 'tee',  tail: 'none' },
  'has-many':   { head: 'crow', tail: 'none' }
};

function relationshipsFor(entities) {
  const relationships = [];

  entities.forEach(entity => {
    if (Array.isArray(entity.relationships)) {
    entity.relationships.forEach(rel => {
      relationships.push({
        source: entity.name,
        name: rel.name,
        target: rel.target,
        arrow: REL_TYPE_TO_ARROW[rel.type]
      });
    });
    }
  });

  return relationships;
}

console.log(template({
  entities,
  relationships: relationshipsFor(entities)
}));
