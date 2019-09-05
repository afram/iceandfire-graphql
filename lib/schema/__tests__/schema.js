"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphql = require("graphql");

var _ = _interopRequireDefault(require(".."));

describe('Schema', function () {
  test('Gets an error when ID is omitted',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var query, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = "{ book { name } }";
            _context.next = 3;
            return (0, _graphql.graphql)(_["default"], query);

          case 3:
            result = _context.sent;
            expect(result.errors.length).toBe(1);
            expect(result.errors[0].message).toBe('must provide id or bookID');
            expect(result.data).toEqual({
              book: null
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('Gets an error when global ID is invalid',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var query, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = "{ book(id: \"notanid\") { name } }";
            _context2.next = 3;
            return (0, _graphql.graphql)(_["default"], query);

          case 3:
            result = _context2.sent;
            expect(result.errors.length).toBe(1);
            expect(result.errors[0].message).toMatchSnapshot();
            expect(result.data).toEqual({
              book: null
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});