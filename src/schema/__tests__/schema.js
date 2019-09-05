import { graphql } from 'graphql';
import gotSchema from '..';

describe('Schema', () => {
  test('Gets an error when ID is omitted', async () => {
    const query = `{ book { name } }`;
    const result = await graphql(gotSchema, query);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].message).toBe('must provide id or bookID');
    expect(result.data).toEqual({ book: null });
  });

  test('Gets an error when global ID is invalid', async () => {
    const query = `{ book(id: "notanid") { name } }`;
    const result = await graphql(gotSchema, query);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].message).toMatchSnapshot();
    expect(result.data).toEqual({ book: null });
  });
});
