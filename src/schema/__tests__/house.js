import { expect } from 'chai';
import { describe, it } from 'mocha';
import { gameOfThrones } from './got';

// 80+ char lines are useful in describe/it, so ignore in this file.
/*eslint-disable max-len */

describe('House type', async () => {
  it('Gets an object by GOT ID', async () => {
    var query = `{ house(houseID: 1) { name } }`;
    var result = await gameOfThrones(query);
    expect(result.data.house.name).to.equal('House Algood');
  });

  it('Gets a different object by GOT ID', async () => {
    var query = `{ house(houseID: 2) { name } }`;
    var result = await gameOfThrones(query);
    expect(result.data.house.name).to.equal('House Allyrion of Godsgrace');
  });

  it('Gets an object by global ID', async () => {
    var query = `{ house(houseID: 1) { id, name } }`;
    var result = await gameOfThrones(query);
    var nextQuery = `{ house(id: "${result.data.house.id}") { id, name } }`;
    var nextResult = await gameOfThrones(nextQuery);
    expect(result.data.house.name).to.equal('House Algood');
    expect(nextResult.data.house.name).to.equal('House Algood');
    expect(result.data.house.id).to.equal(nextResult.data.house.id);
  });

  it('Gets an object by global ID with node', async () => {
    var query = `{ house(houseID: 1) { id, name } }`;
    var result = await gameOfThrones(query);
    var nextQuery = `{
      node(id: "${result.data.house.id}") {
        ... on House {
          id
          name
        }
      }
    }`;
    var nextResult = await gameOfThrones(nextQuery);
    expect(result.data.house.name).to.equal('House Algood');
    expect(nextResult.data.node.name).to.equal('House Algood');
    expect(result.data.house.id).to.equal(nextResult.data.node.id);
  });

  it('Gets all properties', async () => {
    var query = `
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
    var result = await gameOfThrones(query);
    var expected = {
      name: 'House Algood',
      seats: [ ],
      region: 'The Westerlands',
      coatOfArms: 'A golden wreath, on a blue field with a gold border(Azure, a garland of laurel within a bordure or)',
      words: '',
      titles: [ ],
      currentLord: null,
      founder: null,
      founded: '',
      heir: null,
      overlord: { name: 'House Lannister of Casterly Rock' },
      diedOut: '',
      ancestralWeapons: [ ],
      cadetBranchConnection: { edges: [ ] },
      memberConnection: { edges: [ ] }
    };
    expect(result.data.house).to.deep.equal(expected);
  });

  it('All objects query', async() => {
    var query = `{ allHouses { edges { cursor, node { name } } } }`;
    var result = await gameOfThrones(query);
    expect(result.data.allHouses.edges.length).to.equal(444);
  });

  it('Pagination query', async() => {
    var query = `{
      allHouses(first: 2) { edges { cursor, node { name } } }
    }`;
    var result = await gameOfThrones(query);
    expect(result.data.allHouses.edges.map(e => e.node.name))
      .to.deep.equal([
        'House Algood',
        'House Allyrion of Godsgrace'
      ]);
    var nextCursor = result.data.allHouses.edges[1].cursor;

    var nextQuery = `{ allHouses(first: 2, after:"${nextCursor}") {
      edges { cursor, node { name } } }
    }`;
    var nextResult = await gameOfThrones(nextQuery);
    expect(nextResult.data.allHouses.edges.map(e => e.node.name))
      .to.deep.equal([
        'House Amber',
        'House Ambrose'
      ]);
  });
});
