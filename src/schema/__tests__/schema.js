import { graphql } from 'graphql';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import gotSchema from '..';

describe('Schema', () => {
  it('Gets an error when ID is omitted', async () => {
    const query = `{ book { name } }`;
    const result = await graphql(gotSchema, query);
    expect(result.errors.length).to.equal(1);
    expect(result.errors[0].message).to.equal('must provide id or bookID');
    expect(result.data).to.deep.equal({ book: null });
  });

  it('Gets an error when global ID is invalid', async () => {
    const query = `{ book(id: "notanid") { name } }`;
    const result = await graphql(gotSchema, query);
    expect(result.errors.length).to.equal(1);
    expect(result.errors[0].message).to.contain('No entry in local cache for');
    expect(result.data).to.deep.equal({ book: null });
  });
});
