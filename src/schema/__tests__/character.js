import { expect } from 'chai';
import { describe, it } from 'mocha';
import { gameOfThrones } from './got';

describe('Character type', async () => {
  it('Gets an object by GOT ID', async () => {
    const query = `{ character(characterID: 16) { name } }`;
    const result = await gameOfThrones(query);
    expect(result.data.character.name).to.equal('Margaery Tyrell');
  });

  it('Gets a different object by GOT ID', async () => {
    const query = `{ character(characterID: 2) { name } }`;
    const result = await gameOfThrones(query);
    expect(result.data.character.name).to.equal('Walder');
  });

  it('Gets an object by global ID', async () => {
    const query = `{ character(characterID: 16) { id, name } }`;
    const result = await gameOfThrones(query);
    const nextQuery = `{ character(id: "${result.data.character.id}") { id, name } }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(result.data.character.name).to.equal('Margaery Tyrell');
    expect(nextResult.data.character.name).to.equal('Margaery Tyrell');
    expect(result.data.character.id).to.equal(nextResult.data.character.id);
  });

  it('Gets an object by global ID with node', async () => {
    const query = `{ character(characterID: 16) { id, name } }`;
    const result = await gameOfThrones(query);
    const nextQuery = `{
      node(id: "${result.data.character.id}") {
        ... on Character {
          id
          name
        }
      }
    }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(result.data.character.name).to.equal('Margaery Tyrell');
    expect(nextResult.data.node.name).to.equal('Margaery Tyrell');
    expect(result.data.character.id).to.equal(nextResult.data.node.id);
  });

  it('Gets all properties', async () => {
    const query = `
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
    const result = await gameOfThrones(query);
    const expected = {
      name: 'Margaery Tyrell',
      culture: 'Westeros',
      born: 'In 283 AC, at Highgarden',
      died: '',
      titles: ['Queen of the Seven Kingdoms'],
      aliases: ['The Little Queen', 'The Little Rose', 'Maid Margaery'],
      father: null,
      mother: null,
      spouse: { name: 'Renly Baratheon' },
      playedBy: ['Natalie Dormer'],
      tvSeries: ['Season 2', 'Season 3', 'Season 4', 'Season 5'],
      bookConnection: { edges: [{ node: { name: 'A Game of Thrones' } }] },
      childrenConnection: { edges: [] },
      allegianceConnection: {
        edges: [{ node: { name: 'House Tyrell of Highgarden' } }],
      },
      povBookConnection: { edges: [] },
    };
    expect(result.data.character).to.deep.equal(expected);
  });

  it('All objects query', async () => {
    const query = `{ allCharacters { edges { cursor, node { name } } } }`;
    const result = await gameOfThrones(query);
    expect(result.data.allCharacters.edges.length).to.equal(2138);
  });

  it('Pagination query', async () => {
    const query = `{
      allCharacters(first: 2) { edges { cursor, node { name } } }
    }`;
    const result = await gameOfThrones(query);
    expect(result.data.allCharacters.edges.map(e => e.node.name)).to.deep.equal(
      ['', 'Walder']
    );
    const nextCursor = result.data.allCharacters.edges[1].cursor;

    const nextQuery = `{ allCharacters(first: 2, after:"${nextCursor}") {
      edges { cursor, node { culture } } }
    }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(
      nextResult.data.allCharacters.edges.map(e => e.node.culture)
    ).to.deep.equal(['', 'Braavosi']);
  });

  describe('Edge cases', () => {
    it('Returns null if no father is set', async () => {
      const query = `{ character(characterID: 1) { name, father { name } } }`;
      const result = await gameOfThrones(query);
      expect(result.data.character.name).to.equal('');
      expect(result.data.character.father).to.equal(null);
    });

    it('Returns correctly if a father is set', async () => {
      const query = `{ character(characterID: 39) { name, father { name } } }`;
      const result = await gameOfThrones(query);
      expect(result.data.character.name).to.equal('Aegon II');
      expect(result.data.character.father.name).to.equal('Viserys I');
    });
  });
});
