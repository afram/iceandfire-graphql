/* eslint-disable import/no-cycle */
/* @flow */
/**
 * Character Type
 */

import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../relayNode';
import { connectionFromUrls } from '../connections';
import { getObjectFromUrl } from '../apiHelper';

import BookType from './book';
import HouseType from './house';

/**
 * The GraphQL type equivalent of the Character resource
 */
const CharacterType = new GraphQLObjectType({
  name: 'Character',
  description: `An individual person within the Game of Thrones universe.`,
  fields: () => ({
    name: {
      type: GraphQLString,
      description: `The name of this person.`,
    },
    culture: {
      type: GraphQLString,
      description: `The culture of this person.`,
    },
    titles: {
      type: new GraphQLList(GraphQLString),
      description: `The titles this person holds.`,
    },
    aliases: {
      type: new GraphQLList(GraphQLString),
      description: `Other names this person is known by.`,
    },
    born: {
      type: GraphQLString,
      description: `The birth year of the person.`,
    },
    died: {
      type: GraphQLString,
      description: `The year of this person's death.`,
    },
    foundedHouseConnection: connectionFromUrls(
      'CharacterFoundedHouses',
      'foundedHouses',
      HouseType
    ),
    lordOfHouseConnection: connectionFromUrls(
      'CharacterCurrentLordOfHouses',
      'currentLordOfHouses',
      HouseType
    ),
    father: {
      type: CharacterType,
      resolve: person => {
        if (person.father.indexOf('null') >= 0) {
          return null;
        }
        return getObjectFromUrl(person.father);
      },
      description: `This person's father.`,
    },
    mother: {
      type: CharacterType,
      resolve: person => {
        if (person.mother.indexOf('null') >= 0) {
          return null;
        }
        return getObjectFromUrl(person.mother);
      },
      description: `This person's mother.`,
    },
    spouse: {
      type: CharacterType,
      resolve: person => {
        if (person.spouse.indexOf('null') >= 0) {
          return null;
        }
        return getObjectFromUrl(person.spouse);
      },
      description: `This person's spouse.`,
    },
    childrenConnection: connectionFromUrls(
      'CharacterChildren',
      'children',
      CharacterType
    ),
    allegianceConnection: connectionFromUrls(
      'CharacterAllegiances',
      'allegiances',
      HouseType
    ),
    bookConnection: connectionFromUrls('CharacterBooks', 'books', BookType),
    povBookConnection: connectionFromUrls(
      'CharacterPovBooks',
      'povBooks',
      BookType
    ),
    playedBy: {
      type: new GraphQLList(GraphQLString),
      description: `The actor this person is played by.`,
    },
    tvSeries: {
      type: new GraphQLList(GraphQLString),
      description: `The TV Series this person is in.`,
    },
    id: globalIdField('characters'),
  }),
  interfaces: () => [nodeInterface],
});

export default CharacterType;
