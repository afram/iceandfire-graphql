"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionFromUrls = connectionFromUrls;
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _graphqlRelay = require("graphql-relay");

var _graphql = require("graphql");

var _apiHelper = require("./apiHelper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Constructs a GraphQL connection field config; it is assumed
 * that the object has a property named `prop`, and that property
 * contains a list of URLs.
 */
function connectionFromUrls(name, prop, type) {
  var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
    name: name,
    nodeType: type,
    resolveNode: function resolveNode(edge) {
      return (0, _apiHelper.getObjectFromUrl)(edge.node);
    },
    connectionFields: function connectionFields() {
      return (0, _defineProperty2["default"])({
        totalCount: {
          type: _graphql.GraphQLInt,
          resolve: function resolve(conn) {
            return conn.totalCount;
          },
          description: "A count of the total number of objects in this connection, ignoring pagination.\nThis allows a client to fetch the first five objects by passing \"5\" as the\nargument to \"first\", then fetch the total count so it could display \"5 of 83\",\nfor example."
        }
      }, prop, {
        type: new _graphql.GraphQLList(type),
        resolve: function resolve(conn) {
          return conn.edges.map(function (edge) {
            return (0, _apiHelper.getObjectFromUrl)(edge.node);
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
    resolve: function resolve(obj, args) {
      var array = obj[prop] || [];
      return _objectSpread({}, (0, _graphqlRelay.connectionFromArray)(array, args), {
        totalCount: array.length
      });
    }
  };
}

var _default = {
  connectionFromUrls: connectionFromUrls
};
exports["default"] = _default;