import { gameOfThrones } from './got';

describe('Character type', () => {
  test('Gets an object by GOT ID', async () => {
    const query = `{ character(characterID: 16) { name } }`;
    const result = await gameOfThrones(query);
    expect(result.data.character.name).toBe('Margaery Tyrell');
  });

  test('Gets a different object by GOT ID', async () => {
    const query = `{ character(characterID: 2) { name } }`;
    const result = await gameOfThrones(query);
    expect(result.data.character.name).toBe('Walder');
  });

  test('Gets an object by global ID', async () => {
    const query = `{ character(characterID: 16) { id, name } }`;
    const result = await gameOfThrones(query);
    const nextQuery = `{ character(id: "${result.data.character.id}") { id, name } }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(result.data.character.name).toBe('Margaery Tyrell');
    expect(nextResult.data.character.name).toBe('Margaery Tyrell');
    expect(result.data.character.id).toBe(nextResult.data.character.id);
  });

  test('Gets an object by global ID with node', async () => {
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
    expect(result.data.character.name).toBe('Margaery Tyrell');
    expect(nextResult.data.node.name).toBe('Margaery Tyrell');
    expect(result.data.character.id).toBe(nextResult.data.node.id);
  });

  test('Gets all properties', async () => {
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
    expect(result.data.character).toEqual(expected);
  });

  test('All objects query', async () => {
    const query = `{ allCharacters { edges { cursor, node { name } } } }`;
    const result = await gameOfThrones(query);
    expect(result.data.allCharacters.edges.length).toBe(2138);
  });

  test('Pagination query', async () => {
    const query = `{
      allCharacters(first: 2) { edges { cursor, node { name } } }
    }`;
    const result = await gameOfThrones(query);
    expect(result.data.allCharacters.edges.map(e => e.node.name)).toEqual([
      '',
      'Walder',
    ]);
    const nextCursor = result.data.allCharacters.edges[1].cursor;

    const nextQuery = `{ allCharacters(first: 2, after:"${nextCursor}") {
      edges { cursor, node { culture } } }
    }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(
      nextResult.data.allCharacters.edges.map(e => e.node.culture)
    ).toEqual(['', 'Braavosi']);
  });

  describe('Edge cases', () => {
    test('Returns null if no father is set', async () => {
      const query = `{ character(characterID: 1) { name, father { name } } }`;
      const result = await gameOfThrones(query);
      expect(result.data.character.name).toBe('');
      expect(result.data.character.father).toBeNull();
    });

    test('Returns correctly if a father is set', async () => {
      const query = `{ character(characterID: 39) { name, father { name } } }`;
      const result = await gameOfThrones(query);
      expect(result.data.character.name).toBe('Aegon II');
      expect(result.data.character.father.name).toBe('Viserys I');
    });
  });
});
