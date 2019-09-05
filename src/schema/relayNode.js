/* @flow */
import { getObjectFromTypeAndId } from './apiHelper';

import type { GraphQLObjectType } from 'graphql';
import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import BookType from './types/book';
console.log(BookType)
import CharacterType from './types/character';
import HouseType from './types/house';

/**
 * Given a GOT API Resource "type", returns the corresponding GraphQL type.
 */
export function gotTypeToGraphQLType(gotType: string): GraphQLObjectType {
  switch (gotType) {
    case 'books':
      return BookType;
    case 'characters':
      return CharacterType;
    case 'houses':
      return HouseType;
  }
}

var { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    var { type, id } = fromGlobalId(globalId);
    return getObjectFromTypeAndId(type, id);
  },
  obj => {
    var parts = obj.url.split('/');
    return gotTypeToGraphQLType(parts[parts.length - 3]);
  }
);

export { nodeInterface, nodeField };
