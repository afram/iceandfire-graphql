/* eslint-disable import/no-cycle */
/* @flow */

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import type { GraphQLObjectType } from 'graphql';

import { getObjectFromTypeAndId } from './apiHelper';

import BookType from './types/book';

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
    default:
      return null;
  }
}

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    return getObjectFromTypeAndId(type, id);
  },
  obj => {
    const parts = obj.url.split('/');
    return gotTypeToGraphQLType(parts[parts.length - 3]);
  }
);

export { nodeInterface, nodeField };
