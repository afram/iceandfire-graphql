"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _relayNode = require("../relayNode");

var _connections = require("../connections");

var _character = _interopRequireDefault(require("./character"));

/* eslint-disable import/no-cycle */

/**
 * Book Type
 */

/**
 * The GraphQL type equivalent of the Book resource
 */
var _default = new _graphql.GraphQLObjectType({
  name: 'Book',
  description: "A single book.",
  fields: function fields() {
    return {
      name: {
        type: _graphql.GraphQLString,
        description: "The title of this book."
      },
      iSBN: {
        type: _graphql.GraphQLString,
        description: "The book ISBN."
      },
      authors: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString),
        resolve: function resolve(book) {
          return book.authors;
        },
        description: "The name(s) of the author(s) of this book."
      },
      numberOfPages: {
        type: _graphql.GraphQLInt,
        description: "Number of pages in the book."
      },
      publisher: {
        type: _graphql.GraphQLString,
        description: "The publisher of the book."
      },
      country: {
        type: _graphql.GraphQLString,
        description: "The country of origin."
      },
      mediaType: {
        type: _graphql.GraphQLString,
        description: "The book binding material."
      },
      releaseDate: {
        type: _graphql.GraphQLString,
        description: "The ISO 8601 date format of book release at original creator country."
      },
      characterConnection: (0, _connections.connectionFromUrls)('BookCharacters', 'characters', _character["default"]),
      povCharacterConnection: (0, _connections.connectionFromUrls)('BookPovCharacters', 'povCharacters', _character["default"]),
      id: (0, _graphqlRelay.globalIdField)('books')
    };
  },
  interfaces: function interfaces() {
    return [_relayNode.nodeInterface];
  }
});

exports["default"] = _default;