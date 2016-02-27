/* @flow */
/**
 * Book Type
 */

import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField
} from 'graphql-relay';

import { nodeInterface } from '../relayNode';
import { connectionFromUrls } from '../connections';

import CharacterType from './character';

/**
 * The GraphQL type equivalent of the Book resource
 */
var BookType = new GraphQLObjectType({
  name: 'Book',
  description:
`A single book.`,
  fields: () => ({
    name: {
      type: GraphQLString,
      description:
`The title of this book.`
    },
    iSBN: {
      type: GraphQLString,
      description:
`The book ISBN.`
    },
    authors: {
      type: new GraphQLList(GraphQLString),
      resolve: (book) => book.authors,
      description:
`The name(s) of the author(s) of this book.`
    },
    numberOfPages: {
      type: GraphQLInt,
      description:
        `Number of pages in the book.`
    },
    publisher: {
      type: GraphQLString,
      description:
        `The publisher of the book.`
    },
    country: {
      type: GraphQLString,
      description:
        `The country of origin.`
    },
    mediaType: {
      type: GraphQLString,
      description:
        `The book binding material.`
    },
    releaseDate: {
      type: GraphQLString,
      description:
`The ISO 8601 date format of book release at original creator country.`
    },
    characterConnection: connectionFromUrls(
      'BookCharacters',
      'characters',
      CharacterType
    ),
    povCharacterConnection: connectionFromUrls(
      'BookPovCharacters',
      'povCharacters',
      CharacterType
    ),
    id: globalIdField('books')
  }),
  interfaces: () => [nodeInterface]
});

export default BookType;
