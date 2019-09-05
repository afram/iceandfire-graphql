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

var _apiHelper = require("../apiHelper");

var _book = _interopRequireDefault(require("./book"));

var _house = _interopRequireDefault(require("./house"));

/* eslint-disable import/no-cycle */

/**
 * Character Type
 */

/**
 * The GraphQL type equivalent of the Character resource
 */
var CharacterType = new _graphql.GraphQLObjectType({
  name: 'Character',
  description: "An individual person within the Game of Thrones universe.",
  fields: function fields() {
    return {
      name: {
        type: _graphql.GraphQLString,
        description: "The name of this person."
      },
      culture: {
        type: _graphql.GraphQLString,
        description: "The culture of this person."
      },
      titles: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString),
        description: "The titles this person holds."
      },
      aliases: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString),
        description: "Other names this person is known by."
      },
      born: {
        type: _graphql.GraphQLString,
        description: "The birth year of the person."
      },
      died: {
        type: _graphql.GraphQLString,
        description: "The year of this person's death."
      },
      foundedHouseConnection: (0, _connections.connectionFromUrls)('CharacterFoundedHouses', 'foundedHouses', _house["default"]),
      lordOfHouseConnection: (0, _connections.connectionFromUrls)('CharacterCurrentLordOfHouses', 'currentLordOfHouses', _house["default"]),
      father: {
        type: CharacterType,
        resolve: function resolve(person) {
          if (person.father.indexOf('null') >= 0) {
            return null;
          }

          return (0, _apiHelper.getObjectFromUrl)(person.father);
        },
        description: "This person's father."
      },
      mother: {
        type: CharacterType,
        resolve: function resolve(person) {
          if (person.mother.indexOf('null') >= 0) {
            return null;
          }

          return (0, _apiHelper.getObjectFromUrl)(person.mother);
        },
        description: "This person's mother."
      },
      spouse: {
        type: CharacterType,
        resolve: function resolve(person) {
          if (person.spouse.indexOf('null') >= 0) {
            return null;
          }

          return (0, _apiHelper.getObjectFromUrl)(person.spouse);
        },
        description: "This person's spouse."
      },
      childrenConnection: (0, _connections.connectionFromUrls)('CharacterChildren', 'children', CharacterType),
      allegianceConnection: (0, _connections.connectionFromUrls)('CharacterAllegiances', 'allegiances', _house["default"]),
      bookConnection: (0, _connections.connectionFromUrls)('CharacterBooks', 'books', _book["default"]),
      povBookConnection: (0, _connections.connectionFromUrls)('CharacterPovBooks', 'povBooks', _book["default"]),
      playedBy: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString),
        description: "The actor this person is played by."
      },
      tvSeries: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString),
        description: "The TV Series this person is in."
      },
      id: (0, _graphqlRelay.globalIdField)('characters')
    };
  },
  interfaces: function interfaces() {
    return [_relayNode.nodeInterface];
  }
});
var _default = CharacterType;
exports["default"] = _default;