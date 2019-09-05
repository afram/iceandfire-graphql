"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _apiHelper = require("./apiHelper");

var _relayNode = require("./relayNode");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Creates a root field to get an object of a given type.
 * Accepts either `id`, the globally unique ID used in GraphQL,
 * or `idName`, the per-type ID used in GOT-API.
 */
function rootFieldByID(idName, gotType) {
  var getter = function getter(id) {
    return (0, _apiHelper.getObjectFromTypeAndId)(gotType, id);
  };

  var argDefs = {};
  argDefs.id = {
    type: _graphql.GraphQLID
  };
  argDefs[idName] = {
    type: _graphql.GraphQLID
  };
  return {
    type: (0, _relayNode.gotTypeToGraphQLType)(gotType),
    args: argDefs,
    resolve: function resolve(_, args) {
      if (args[idName] !== undefined && args[idName] !== null) {
        return getter(args[idName]);
      }

      if (args.id !== undefined && args.id !== null) {
        var globalId = (0, _graphqlRelay.fromGlobalId)(args.id);

        if (globalId.id === null || globalId.id === undefined || globalId.id === '') {
          throw new Error("No valid ID extracted from ".concat(args.id));
        }

        return getter(globalId.id);
      }

      throw new Error("must provide id or ".concat(idName));
    }
  };
}
/**
 * Creates a connection that will return all objects of the given
 * `gotType`; the connection will be named using `name`.
 */


function rootConnection(name, gotType) {
  var graphqlType = (0, _relayNode.gotTypeToGraphQLType)(gotType);

  var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
    name: name,
    nodeType: graphqlType,
    connectionFields: function connectionFields() {
      return (0, _defineProperty2["default"])({
        totalCount: {
          type: _graphql.GraphQLInt,
          resolve: function resolve(conn) {
            return conn.totalCount;
          },
          description: "A count of the total number of objects in this connection, ignoring pagination.\nThis allows a client to fetch the first five objects by passing \"5\" as the\nargument to \"first\", then fetch the total count so it could display \"5 of 83\",\nfor example."
        }
      }, gotType, {
        type: new _graphql.GraphQLList(graphqlType),
        resolve: function resolve(conn) {
          return conn.edges.map(function (edge) {
            return edge.node;
          });
        },
        description: "A list of all of the objects returned in the connection. This is a convenience\nfield provided for quickly exploring the API; rather than querying for\n\"{ edges { node } }\" when no edge data is needed, this field can be be used\ninstead. Note that when clients like Relay need to fetch the \"cursor\" field on\nthe edge to enable efficient pagination, this shortcut cannot be used, and the\nfull \"{ edges { node } }\" version should be used instead."
      });
    }
  }),
      connectionType = _connectionDefinition.connectionType;

  return {
    type: connectionType,
    args: _graphqlRelay.connectionArgs,
    resolve: function () {
      var _resolve = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args) {
        var _ref2, objects, totalCount;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _apiHelper.getObjectsByType)(gotType, args);

              case 2:
                _ref2 = _context.sent;
                objects = _ref2.objects;
                totalCount = _ref2.totalCount;
                return _context.abrupt("return", _objectSpread({}, (0, _graphqlRelay.connectionFromArray)(objects, args), {
                  totalCount: totalCount
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function resolve(_x, _x2) {
        return _resolve.apply(this, arguments);
      }

      return resolve;
    }()
  };
}
/**
 * The GraphQL type equivalent of the Root resource
 */


var rootType = new _graphql.GraphQLObjectType({
  name: 'Root',
  fields: {
    allBooks: rootConnection('Books', 'books'),
    book: rootFieldByID('bookID', 'books'),
    allCharacters: rootConnection('Characters', 'characters'),
    character: rootFieldByID('characterID', 'characters'),
    allHouses: rootConnection('Houses', 'houses'),
    house: rootFieldByID('houseID', 'houses'),
    node: _relayNode.nodeField
  }
});

var _default = new _graphql.GraphQLSchema({
  query: rootType
});

exports["default"] = _default;