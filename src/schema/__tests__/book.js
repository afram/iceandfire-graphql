import { expect } from 'chai';
import { describe, it } from 'mocha';
import { gameOfThrones } from './got';

// 80+ char lines are useful in describe/it, so ignore in this file.
/*eslint-disable max-len */

describe('Book type', async () => {
  it('Gets an object by GOT ID', async () => {
    var query = `{ book(bookID: 1) { name } }`;
    var result = await gameOfThrones(query);
    expect(result.data.book.name).to.equal('A Game of Thrones');
  });

  it('Gets a different object by GOT ID', async () => {
    var query = `{ book(bookID: 2) { name } }`;
    var result = await gameOfThrones(query);
    expect(result.data.book.name).to.equal('A Clash of Kings');
  });

  it('Gets an object by global ID', async () => {
    var query = `{ book(bookID: 1) { id, name } }`;
    var result = await gameOfThrones(query);
    var nextQuery = `{ book(id: "${result.data.book.id}") { id, name } }`;
    var nextResult = await gameOfThrones(nextQuery);
    expect(result.data.book.name).to.equal('A Game of Thrones');
    expect(nextResult.data.book.name).to.equal('A Game of Thrones');
    expect(result.data.book.id).to.equal(nextResult.data.book.id);
  });

  it('Gets an object by global ID with node', async () => {
    var query = `{ book(bookID: 1) { id, name } }`;
    var result = await gameOfThrones(query);
    var nextQuery = `{
      node(id: "${result.data.book.id}") {
        ... on Book {
          id
          name
        }
      }
    }`;
    var nextResult = await gameOfThrones(nextQuery);
    expect(result.data.book.name).to.equal('A Game of Thrones');
    expect(nextResult.data.node.name).to.equal('A Game of Thrones');
    expect(result.data.book.id).to.equal(nextResult.data.node.id);
  });

  it('Gets all properties', async () => {
    var query = `
{
  book(bookID: 1) {
    name
    iSBN
    authors
    numberOfPages
    publisher
    country
    mediaType
    releaseDate
    characterConnection(first:1) { edges { node { name } } }
    povCharacterConnection(first:1) { edges { node { name } } }

  }
}`;
    var result = await gameOfThrones(query);
    var expected = {
      name: 'A Game of Thrones',
      iSBN: '978-0553103540',
      authors: [ 'George R. R. Martin' ],
      numberOfPages: 694,
      publisher: 'Bantam Books',
      country: 'United States',
      mediaType: 'Hardcover',
      releaseDate: '1996-08-01T00:00:00',
      characterConnection: { edges: [ { node: { name: 'Walder' } } ] },
      povCharacterConnection: { edges: [ { node: { name: 'Arya Stark' } } ] }
    };
    expect(result.data.book).to.deep.equal(expected);
  });

  it('All objects query', async() => {
    var query = `{ allBooks { edges { cursor, node { name } } } }`;
    var result = await gameOfThrones(query);
    expect(result.data.allBooks.edges.length).to.equal(12);
  });

  it('Pagination query', async() => {
    var query = `{
      allBooks(first: 2) { edges { cursor, node { name } } }
    }`;
    var result = await gameOfThrones(query);
    expect(result.data.allBooks.edges.map(e => e.node.name))
      .to.deep.equal([
        'A Game of Thrones',
        'A Clash of Kings'
      ]);
    var nextCursor = result.data.allBooks.edges[1].cursor;

    var nextQuery = `{ allBooks(first: 2, after:"${nextCursor}") {
      edges { cursor, node { name } } }
    }`;
    var nextResult = await gameOfThrones(nextQuery);
    expect(nextResult.data.allBooks.edges.map(e => e.node.name))
      .to.deep.equal([
        'A Storm of Swords',
        'The Hedge Knight'
      ]);
  });
});
