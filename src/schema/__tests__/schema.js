import { expect } from 'chai';
import { describe, it } from 'mocha';
import gotSchema from '../';
import { graphql } from 'graphql';

// 80+ char lines are useful in describe/it, so ignore in this file.
// Some chai expects appear as unused expressions
/*eslint-disable max-len, no-unused-expressions */

describe('Schema', () => {
  it('Gets an error when ID is omitted', async () => {
    var query = `{ book { name } }`;
    var result = await graphql(gotSchema, query);
    expect(result.errors.length).to.equal(1);
    expect(result.errors[0].message).to.equal('must provide id or bookID');
    expect(result.data).to.deep.equal({book: null});
  });

  it('Gets an error when global ID is invalid', async () => {
    var query = `{ book(id: "notanid") { name } }`;
    var result = await graphql(gotSchema, query);
    expect(result.errors.length).to.equal(1);
    expect(result.errors[0].message).to.contain(
      'No entry in local cache for'
    );
    expect(result.data).to.deep.equal({book: null});
  });
});
