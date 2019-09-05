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

var _character = _interopRequireDefault(require("./character"));

/* eslint-disable import/no-cycle */

/**
 * House Type
 */

/**
 * The GraphQL type equivalent of the House resource
 */
var HouseType = new _graphql.GraphQLObjectType({
  name: 'House',
  description: "A ruling dynasty.",
  fields: function fields() {
    return {
      name: {
        type: _graphql.GraphQLString,
        description: "The name of this house."
      },
      region: {
        type: _graphql.GraphQLString,
        description: "The region this house is governs."
      },
      coatOfArms: {
        type: _graphql.GraphQLString,
        description: "A description of the coat of arms of this house."
      },
      words: {
        type: _graphql.GraphQLString,
        description: "The house words."
      },
      titles: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString),
        resolve: function resolve(house) {
          return house.titles;
        },
        description: "The titles this house possesses."
      },
      seats: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString),
        resolve: function resolve(house) {
          return house.seats;
        },
        description: "The seats this house sit at or formerly sat at."
      },
      currentLord: {
        type: _character["default"],
        resolve: function resolve(house) {
          if (house.currentLord.indexOf('null') >= 0) {
            return null;
          }

          return (0, _apiHelper.getObjectFromUrl)(house.currentLord);
        }
      },
      heir: {
        type: _character["default"],
        resolve: function resolve(house) {
          if (house.heir.indexOf('null') >= 0) {
            return null;
          }

          return (0, _apiHelper.getObjectFromUrl)(house.heir);
        }
      },
      overlord: {
        type: HouseType,
        resolve: function resolve(house) {
          if (house.overlord.indexOf('null') >= 0) {
            return null;
          }

          return (0, _apiHelper.getObjectFromUrl)(house.overlord);
        }
      },
      founded: {
        type: _graphql.GraphQLString,
        description: "When the house was founded"
      },
      founder: {
        type: _character["default"],
        resolve: function resolve(house) {
          if (house.founder.indexOf('null') >= 0) {
            return null;
          }

          return (0, _apiHelper.getObjectFromUrl)(house.founder);
        }
      },
      diedOut: {
        type: _graphql.GraphQLString,
        description: "When this house died out."
      },
      ancestralWeapons: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString),
        resolve: function resolve(house) {
          return house.ancestralWeapons;
        },
        description: "Ancestral weapons owned by this hoouse."
      },
      cadetBranchConnection: (0, _connections.connectionFromUrls)('HouseCadetBranches', 'cadetBranches', HouseType),
      memberConnection: (0, _connections.connectionFromUrls)('HouseSwornMembers', 'swornMembers', _character["default"]),
      id: (0, _graphqlRelay.globalIdField)('houses')
    };
  },
  interfaces: function interfaces() {
    return [_relayNode.nodeInterface];
  }
});
var _default = HouseType;
exports["default"] = _default;