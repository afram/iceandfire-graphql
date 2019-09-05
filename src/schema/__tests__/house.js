import { gameOfThrones } from './got';

describe('House type', () => {
  test('Gets an object by GOT ID', async () => {
    const query = `{ house(houseID: 1) { name } }`;
    const result = await gameOfThrones(query);
    expect(result.data.house.name).toBe('House Algood');
  });

  test('Gets a different object by GOT ID', async () => {
    const query = `{ house(houseID: 2) { name } }`;
    const result = await gameOfThrones(query);
    expect(result.data.house.name).toBe('House Allyrion of Godsgrace');
  });

  test('Gets an object by global ID', async () => {
    const query = `{ house(houseID: 1) { id, name } }`;
    const result = await gameOfThrones(query);
    const nextQuery = `{ house(id: "${result.data.house.id}") { id, name } }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(result.data.house.name).toBe('House Algood');
    expect(nextResult.data.house.name).toBe('House Algood');
    expect(result.data.house.id).toBe(nextResult.data.house.id);
  });

  test('Gets an object by global ID with node', async () => {
    const query = `{ house(houseID: 1) { id, name } }`;
    const result = await gameOfThrones(query);
    const nextQuery = `{
      node(id: "${result.data.house.id}") {
        ... on House {
          id
          name
        }
      }
    }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(result.data.house.name).toBe('House Algood');
    expect(nextResult.data.node.name).toBe('House Algood');
    expect(result.data.house.id).toBe(nextResult.data.node.id);
  });

  test('Gets all properties', async () => {
    const query = `
{
  house(houseID: 1) {
    name
    seats
    region
    coatOfArms
    words
    titles
    currentLord { name }
    founder { name }
    founded
    heir { name }
    overlord { name }
    diedOut
    ancestralWeapons
    cadetBranchConnection(first:1) { edges { node { name } } }
    memberConnection(first:1) { edges { node { name } } }
  }
}`;
    const result = await gameOfThrones(query);
    const expected = {
      name: 'House Algood',
      seats: [],
      region: 'The Westerlands',
      coatOfArms:
        'A golden wreath, on a blue field with a gold border(Azure, a garland of laurel within a bordure or)',
      words: '',
      titles: [],
      currentLord: null,
      founder: null,
      founded: '',
      heir: null,
      overlord: { name: 'House Lannister of Casterly Rock' },
      diedOut: '',
      ancestralWeapons: [],
      cadetBranchConnection: { edges: [] },
      memberConnection: { edges: [] },
    };
    expect(result.data.house).toEqual(expected);
  });

  test('All objects query', async () => {
    const query = `{ allHouses { edges { cursor, node { name } } } }`;
    const result = await gameOfThrones(query);
    expect(result.data.allHouses.edges.length).toBe(444);
  });

  test('Pagination query', async () => {
    const query = `{
      allHouses(first: 2) { edges { cursor, node { name } } }
    }`;
    const result = await gameOfThrones(query);
    expect(result.data.allHouses.edges.map(e => e.node.name)).toEqual([
      'House Algood',
      'House Allyrion of Godsgrace',
    ]);
    const nextCursor = result.data.allHouses.edges[1].cursor;

    const nextQuery = `{ allHouses(first: 2, after:"${nextCursor}") {
      edges { cursor, node { name } } }
    }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(nextResult.data.allHouses.edges.map(e => e.node.name)).toEqual([
      'House Amber',
      'House Ambrose',
    ]);
  });
});
