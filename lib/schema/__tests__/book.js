"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _got = require("./got");

describe('Book type', function () {
  test('Gets an object by GOT ID',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var query, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = "{ book(bookID: 1) { name } }";
            _context.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context.sent;
            expect(result.data.book.name).toBe('A Game of Thrones');

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('Gets a different object by GOT ID',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var query, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = "{ book(bookID: 2) { name } }";
            _context2.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context2.sent;
            expect(result.data.book.name).toBe('A Clash of Kings');

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('Gets an object by global ID',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var query, result, nextQuery, nextResult;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            query = "{ book(bookID: 1) { id, name } }";
            _context3.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context3.sent;
            nextQuery = "{ book(id: \"".concat(result.data.book.id, "\") { id, name } }");
            _context3.next = 7;
            return (0, _got.gameOfThrones)(nextQuery);

          case 7:
            nextResult = _context3.sent;
            expect(result.data.book.name).toBe('A Game of Thrones');
            expect(nextResult.data.book.name).toBe('A Game of Thrones');
            expect(result.data.book.id).toBe(nextResult.data.book.id);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('Gets an object by global ID with node',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var query, result, nextQuery, nextResult;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            query = "{ book(bookID: 1) { id, name } }";
            _context4.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context4.sent;
            nextQuery = "{\n      node(id: \"".concat(result.data.book.id, "\") {\n        ... on Book {\n          id\n          name\n        }\n      }\n    }");
            _context4.next = 7;
            return (0, _got.gameOfThrones)(nextQuery);

          case 7:
            nextResult = _context4.sent;
            expect(result.data.book.name).toBe('A Game of Thrones');
            expect(nextResult.data.node.name).toBe('A Game of Thrones');
            expect(result.data.book.id).toBe(nextResult.data.node.id);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test('Gets all properties',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var query, result, expected;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            query = "\n{\n  book(bookID: 1) {\n    name\n    iSBN\n    authors\n    numberOfPages\n    publisher\n    country\n    mediaType\n    releaseDate\n    characterConnection(first:1) { edges { node { name } } }\n    povCharacterConnection(first:1) { edges { node { name } } }\n\n  }\n}";
            _context5.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context5.sent;
            expected = {
              name: 'A Game of Thrones',
              iSBN: '978-0553103540',
              authors: ['George R. R. Martin'],
              numberOfPages: 694,
              publisher: 'Bantam Books',
              country: 'United States',
              mediaType: 'Hardcover',
              releaseDate: '1996-08-01T00:00:00',
              characterConnection: {
                edges: [{
                  node: {
                    name: 'Walder'
                  }
                }]
              },
              povCharacterConnection: {
                edges: [{
                  node: {
                    name: 'Arya Stark'
                  }
                }]
              }
            };
            expect(result.data.book).toEqual(expected);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  test('All objects query',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    var query, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            query = "{ allBooks { edges { cursor, node { name } } } }";
            _context6.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context6.sent;
            expect(result.data.allBooks.edges.length).toBe(12);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  test('Pagination query',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    var query, result, nextCursor, nextQuery, nextResult;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            query = "{\n      allBooks(first: 2) { edges { cursor, node { name } } }\n    }";
            _context7.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context7.sent;
            expect(result.data.allBooks.edges.map(function (e) {
              return e.node.name;
            })).toEqual(['A Game of Thrones', 'A Clash of Kings']);
            nextCursor = result.data.allBooks.edges[1].cursor;
            nextQuery = "{ allBooks(first: 2, after:\"".concat(nextCursor, "\") {\n      edges { cursor, node { name } } }\n    }");
            _context7.next = 9;
            return (0, _got.gameOfThrones)(nextQuery);

          case 9:
            nextResult = _context7.sent;
            expect(nextResult.data.allBooks.edges.map(function (e) {
              return e.node.name;
            })).toEqual(['A Storm of Swords', 'The Hedge Knight']);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
});