import gotSchema from '../';
import { graphql } from 'graphql';

export async function gameOfThrones(query) {
  var result = await graphql(gotSchema, query);
  if (result.errors !== undefined) {
    throw new Error(JSON.stringify(result.errors, null, 2));
  }
  return result;
}
