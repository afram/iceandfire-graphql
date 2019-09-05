"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameOfThrones = gameOfThrones;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphql = require("graphql");

var _ = _interopRequireDefault(require(".."));

function gameOfThrones(_x) {
  return _gameOfThrones.apply(this, arguments);
}

function _gameOfThrones() {
  _gameOfThrones = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(query) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _graphql.graphql)(_["default"], query);

          case 2:
            result = _context2.sent;

            if (!(result.errors !== undefined)) {
              _context2.next = 5;
              break;
            }

            throw new Error(JSON.stringify(result.errors, null, 2));

          case 5:
            return _context2.abrupt("return", result);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _gameOfThrones.apply(this, arguments);
}

test('got',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          expect(1).toBe(1);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
var _default = gameOfThrones;
exports["default"] = _default;