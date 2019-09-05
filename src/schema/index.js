/* @flow */

import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import {
  fromGlobalId,
  connectionFromArray,
  connectionArgs,
  connectionDefinitions,
} from 'graphql-relay';

import { getObjectsByType, getObjectFromTypeAndId } from './apiHelper';

import { gotTypeToGraphQLType, nodeField } from './relayNode';

/**
 * Creates a root field to get an object of a given type.
 * Accepts either `id`, the globally unique ID used in GraphQL,
 * or `idName`, the per-type ID used in GOT-API.
 */
function rootFieldByID(idName, gotType) {
  const getter = id => getObjectFromTypeAndId(gotType, id);
  const argDefs = {};
  argDefs.id = { type: GraphQLID };
  argDefs[idName] = { type: GraphQLID };
  return {
    type: gotTypeToGraphQLType(gotType),
    args: argDefs,
    resolve: (_, args) => {
      if (args[idName] !== undefined && args[idName] !== null) {
        return getter(args[idName]);
      }

      if (args.id !== undefined && args.id !== null) {
        const globalId = fromGlobalId(args.id);
        if (
          globalId.id === null ||
          globalId.id === undefined ||
          globalId.id === ''
        ) {
          throw new Error(`No valid ID extracted from ${args.id}`);
        }
        return getter(globalId.id);
      }
      throw new Error(`must provide id or ${idName}`);
    },
  };
}

/**
 * Creates a connection that will return all objects of the given
 * `gotType`; the connection will be named using `name`.
 */
function rootConnection(name, gotType) {
  const graphqlType = gotTypeToGraphQLType(gotType);
  const { connectionType } = connectionDefinitions({
    name,
    nodeType: graphqlType,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: conn => conn.totalCount,
        description: `A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example.`,
      },
      [gotType]: {
        type: new GraphQLList(graphqlType),
        resolve: conn => conn.edges.map(edge => edge.node),
        description: `A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead.`,
      },
    }),
  });
  return {
    type: connectionType,
    args: connectionArgs,
    resolve: async (_, args) => {
      const { objects, totalCount } = await getObjectsByType(gotType, args);
      return {
        ...connectionFromArray(objects, args),
        totalCount,
      };
    },
  };
}

/**
 * The GraphQL type equivalent of the Root resource
 */
const rootType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    allBooks: rootConnection('Books', 'books'),
    book: rootFieldByID('bookID', 'books'),
    allCharacters: rootConnection('Characters', 'characters'),
    character: rootFieldByID('characterID', 'characters'),
    allHouses: rootConnection('Houses', 'houses'),
    house: rootFieldByID('houseID', 'houses'),
    node: nodeField,
  },
});

export default new GraphQLSchema({ query: rootType });
