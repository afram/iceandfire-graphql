import { gameOfThrones } from './got';

describe('Book type', () => {
  test('Gets an object by GOT ID', async () => {
    const query = `{ book(bookID: 1) { name } }`;
    const result = await gameOfThrones(query);
    expect(result.data.book.name).toBe('A Game of Thrones');
  });

  test('Gets a different object by GOT ID', async () => {
    const query = `{ book(bookID: 2) { name } }`;
    const result = await gameOfThrones(query);
    expect(result.data.book.name).toBe('A Clash of Kings');
  });

  test('Gets an object by global ID', async () => {
    const query = `{ book(bookID: 1) { id, name } }`;
    const result = await gameOfThrones(query);
    const nextQuery = `{ book(id: "${result.data.book.id}") { id, name } }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(result.data.book.name).toBe('A Game of Thrones');
    expect(nextResult.data.book.name).toBe('A Game of Thrones');
    expect(result.data.book.id).toBe(nextResult.data.book.id);
  });

  test('Gets an object by global ID with node', async () => {
    const query = `{ book(bookID: 1) { id, name } }`;
    const result = await gameOfThrones(query);
    const nextQuery = `{
      node(id: "${result.data.book.id}") {
        ... on Book {
          id
          name
        }
      }
    }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(result.data.book.name).toBe('A Game of Thrones');
    expect(nextResult.data.node.name).toBe('A Game of Thrones');
    expect(result.data.book.id).toBe(nextResult.data.node.id);
  });

  test('Gets all properties', async () => {
    const query = `
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
    const result = await gameOfThrones(query);
    const expected = {
      name: 'A Game of Thrones',
      iSBN: '978-0553103540',
      authors: ['George R. R. Martin'],
      numberOfPages: 694,
      publisher: 'Bantam Books',
      country: 'United States',
      mediaType: 'Hardcover',
      releaseDate: '1996-08-01T00:00:00',
      characterConnection: { edges: [{ node: { name: 'Walder' } }] },
      povCharacterConnection: { edges: [{ node: { name: 'Arya Stark' } }] },
    };
    expect(result.data.book).toEqual(expected);
  });

  test('All objects query', async () => {
    const query = `{ allBooks { edges { cursor, node { name } } } }`;
    const result = await gameOfThrones(query);
    expect(result.data.allBooks.edges.length).toBe(12);
  });

  test('Pagination query', async () => {
    const query = `{
      allBooks(first: 2) { edges { cursor, node { name } } }
    }`;
    const result = await gameOfThrones(query);
    expect(result.data.allBooks.edges.map(e => e.node.name)).toEqual([
      'A Game of Thrones',
      'A Clash of Kings',
    ]);
    const nextCursor = result.data.allBooks.edges[1].cursor;

    const nextQuery = `{ allBooks(first: 2, after:"${nextCursor}") {
      edges { cursor, node { name } } }
    }`;
    const nextResult = await gameOfThrones(nextQuery);
    expect(nextResult.data.allBooks.edges.map(e => e.node.name)).toEqual([
      'A Storm of Swords',
      'The Hedge Knight',
    ]);
  });
});
