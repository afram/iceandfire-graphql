/* eslint-disable import/no-cycle */
/* @flow */
/**
 * House Type
 */

import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../relayNode';
import { connectionFromUrls } from '../connections';
import { getObjectFromUrl } from '../apiHelper';

import CharacterType from './character';

/**
 * The GraphQL type equivalent of the House resource
 */
const HouseType = new GraphQLObjectType({
  name: 'House',
  description: `A ruling dynasty.`,
  fields: () => ({
    name: {
      type: GraphQLString,
      description: `The name of this house.`,
    },
    region: {
      type: GraphQLString,
      description: `The region this house is governs.`,
    },
    coatOfArms: {
      type: GraphQLString,
      description: `A description of the coat of arms of this house.`,
    },
    words: {
      type: GraphQLString,
      description: `The house words.`,
    },
    titles: {
      type: new GraphQLList(GraphQLString),
      resolve: house => house.titles,
      description: `The titles this house possesses.`,
    },
    seats: {
      type: new GraphQLList(GraphQLString),
      resolve: house => house.seats,
      description: `The seats this house sit at or formerly sat at.`,
    },
    currentLord: {
      type: CharacterType,
      resolve: house => {
        if (house.currentLord.indexOf('null') >= 0) {
          return null;
        }
        return getObjectFromUrl(house.currentLord);
      },
    },
    heir: {
      type: CharacterType,
      resolve: house => {
        if (house.heir.indexOf('null') >= 0) {
          return null;
        }
        return getObjectFromUrl(house.heir);
      },
    },
    overlord: {
      type: HouseType,
      resolve: house => {
        if (house.overlord.indexOf('null') >= 0) {
          return null;
        }
        return getObjectFromUrl(house.overlord);
      },
    },
    founded: {
      type: GraphQLString,
      description: `When the house was founded`,
    },
    founder: {
      type: CharacterType,
      resolve: house => {
        if (house.founder.indexOf('null') >= 0) {
          return null;
        }
        return getObjectFromUrl(house.founder);
      },
    },
    diedOut: {
      type: GraphQLString,
      description: `When this house died out.`,
    },
    ancestralWeapons: {
      type: new GraphQLList(GraphQLString),
      resolve: house => house.ancestralWeapons,
      description: `Ancestral weapons owned by this hoouse.`,
    },
    cadetBranchConnection: connectionFromUrls(
      'HouseCadetBranches',
      'cadetBranches',
      HouseType
    ),
    memberConnection: connectionFromUrls(
      'HouseSwornMembers',
      'swornMembers',
      CharacterType
    ),
    id: globalIdField('houses'),
  }),
  interfaces: () => [nodeInterface],
});

export default HouseType;
