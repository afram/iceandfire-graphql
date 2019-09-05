"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gotTypeToGraphQLType = gotTypeToGraphQLType;
exports.nodeField = exports.nodeInterface = void 0;

var _graphqlRelay = require("graphql-relay");

var _apiHelper = require("./apiHelper");

var _book = _interopRequireDefault(require("./types/book"));

var _character = _interopRequireDefault(require("./types/character"));

var _house = _interopRequireDefault(require("./types/house"));

/* eslint-disable import/no-cycle */

/**
 * Given a GOT API Resource "type", returns the corresponding GraphQL type.
 */
function gotTypeToGraphQLType(gotType) {
  switch (gotType) {
    case 'books':
      return _book["default"];

    case 'characters':
      return _character["default"];

    case 'houses':
      return _house["default"];

    default:
      return null;
  }
}

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId),
      type = _fromGlobalId.type,
      id = _fromGlobalId.id;

  return (0, _apiHelper.getObjectFromTypeAndId)(type, id);
}, function (obj) {
  var parts = obj.url.split('/');
  return gotTypeToGraphQLType(parts[parts.length - 3]);
}),
    nodeInterface = _nodeDefinitions.nodeInterface,
    nodeField = _nodeDefinitions.nodeField;

exports.nodeField = nodeField;
exports.nodeInterface = nodeInterface;