import { expect } from 'chai';
import { describe, it } from 'mocha';
import { gameOfThrones } from './got';

// 80+ char lines are useful in describe/it, so ignore in this file.
/*eslint-disable max-len */

describe('Character type', async () => {
  it('Gets an object by GOT ID', async () => {
    var query = `{ character(characterID: 16) { name } }`;
    var result = await gameOfThrones(query);
    expect(result.data.character.name).to.equal('Margaery Tyrell');
  });

  it('Gets a different object by GOT ID', async () => {
    var query = `{ character(characterID: 2) { name } }`;
    var result = await gameOfThrones(query);
    expect(result.data.character.name).to.equal('Walder');
  });

  it('Gets an object by global ID', async () => {
    var query = `{ character(characterID: 16) { id, name } }`;
    var result = await gameOfThrones(query);
    var nextQuery = `{ character(id: "${result.data.character.id}") { id, name } }`;
    var nextResult = await gameOfThrones(nextQuery);
    expect(result.data.character.name).to.equal('Margaery Tyrell');
    expect(nextResult.data.character.name).to.equal('Margaery Tyrell');
    expect(result.data.character.id).to.equal(nextResult.data.character.id);
  });

  it('Gets an object by global ID with node', async () => {
    var query = `{ character(characterID: 16) { id, name } }`;
    var result = await gameOfThrones(query);
    var nextQuery = `{
      node(id: "${result.data.character.id}") {
        ... on Character {
          id
          name
        }
      }
    }`;
    var nextResult = await gameOfThrones(nextQuery);
    expect(result.data.character.name).to.equal('Margaery Tyrell');
    expect(nextResult.data.node.name).to.equal('Margaery Tyrell');
    expect(result.data.character.id).to.equal(nextResult.data.node.id);
  });

  it('Gets all properties', async () => {
    var query = `
{
  character(characterID: 16) {
    name
    culture
    born
    died
    titles
    aliases
    father { name }
    mother { name }
    spouse { name }
    tvSeries
    playedBy
    bookConnection(first:1) { edges { node { name } } }
    childrenConnection(first:1) { edges { node { name } } }
    allegianceConnection(first:1) { edges { node { name } } }
    povBookConnection(first:1) { edges { node { name } } }
  }
}`;
    var result = await gameOfThrones(query);
    var expected = {
      name: 'Margaery Tyrell',
      culture: 'Westeros',
      born: 'In 283 AC, at Highgarden',
      died: '',
      titles: [ 'Queen of the Seven Kingdoms' ],
      aliases: [ 'The Little Queen', 'The Little Rose', 'Maid Margaery' ],
      father: null,
      mother: null,
      spouse: { name: 'Renly Baratheon' },
      playedBy: [ 'Natalie Dormer' ],
      tvSeries: [ 'Season 2', 'Season 3', 'Season 4', 'Season 5' ],
      bookConnection: { edges: [{ node: { name: 'A Game of Thrones' } }] },
      childrenConnection: { edges: [ ] },
      allegianceConnection: { edges: [{ node: { name: 'House Tyrell of Highgarden' } }] },
      povBookConnection: { edges: [ ] }
    };
    expect(result.data.character).to.deep.equal(expected);
  });

  it('All objects query', async() => {
    var query = `{ allCharacters { edges { cursor, node { name } } } }`;
    var result = await gameOfThrones(query);
    expect(result.data.allCharacters.edges.length).to.equal(2138);
  });

  it('Pagination query', async() => {
    var query = `{
      allCharacters(first: 2) { edges { cursor, node { name } } }
    }`;
    var result = await gameOfThrones(query);
    expect(result.data.allCharacters.edges.map(e => e.node.name))
      .to.deep.equal([
        '',
        'Walder'
      ]);
    var nextCursor = result.data.allCharacters.edges[1].cursor;

    var nextQuery = `{ allCharacters(first: 2, after:"${nextCursor}") {
      edges { cursor, node { culture } } }
    }`;
    var nextResult = await gameOfThrones(nextQuery);
    expect(nextResult.data.allCharacters.edges.map(e => e.node.culture))
      .to.deep.equal([
        '',
        'Braavosi'
      ]);
  });

  describe('Edge cases', () => {
    it('Returns null if no father is set', async () => {
      var query = `{ character(characterID: 1) { name, father { name } } }`;
      var result = await gameOfThrones(query);
      expect(result.data.character.name).to.equal('');
      expect(result.data.character.father).to.equal(null);
    });

    it('Returns correctly if a father is set', async () => {
      var query = `{ character(characterID: 39) { name, father { name } } }`;
      var result = await gameOfThrones(query);
      expect(result.data.character.name).to.equal('Aegon II');
      expect(result.data.character.father.name).to.equal('Viserys I');
    });
  });
});
