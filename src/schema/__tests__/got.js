import { graphql } from 'graphql';
import gotSchema from '..';

export async function gameOfThrones(query) {
  const result = await graphql(gotSchema, query);
  if (result.errors !== undefined) {
    throw new Error(JSON.stringify(result.errors, null, 2));
  }
  return result;
}
export default gameOfThrones;
