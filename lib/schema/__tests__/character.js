"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _got = require("./got");

describe('Character type', function () {
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
            query = "{ character(characterID: 16) { name } }";
            _context.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context.sent;
            expect(result.data.character.name).toBe('Margaery Tyrell');

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
            query = "{ character(characterID: 2) { name } }";
            _context2.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context2.sent;
            expect(result.data.character.name).toBe('Walder');

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
            query = "{ character(characterID: 16) { id, name } }";
            _context3.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context3.sent;
            nextQuery = "{ character(id: \"".concat(result.data.character.id, "\") { id, name } }");
            _context3.next = 7;
            return (0, _got.gameOfThrones)(nextQuery);

          case 7:
            nextResult = _context3.sent;
            expect(result.data.character.name).toBe('Margaery Tyrell');
            expect(nextResult.data.character.name).toBe('Margaery Tyrell');
            expect(result.data.character.id).toBe(nextResult.data.character.id);

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
            query = "{ character(characterID: 16) { id, name } }";
            _context4.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context4.sent;
            nextQuery = "{\n      node(id: \"".concat(result.data.character.id, "\") {\n        ... on Character {\n          id\n          name\n        }\n      }\n    }");
            _context4.next = 7;
            return (0, _got.gameOfThrones)(nextQuery);

          case 7:
            nextResult = _context4.sent;
            expect(result.data.character.name).toBe('Margaery Tyrell');
            expect(nextResult.data.node.name).toBe('Margaery Tyrell');
            expect(result.data.character.id).toBe(nextResult.data.node.id);

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
            query = "\n{\n  character(characterID: 16) {\n    name\n    culture\n    born\n    died\n    titles\n    aliases\n    father { name }\n    mother { name }\n    spouse { name }\n    tvSeries\n    playedBy\n    bookConnection(first:1) { edges { node { name } } }\n    childrenConnection(first:1) { edges { node { name } } }\n    allegianceConnection(first:1) { edges { node { name } } }\n    povBookConnection(first:1) { edges { node { name } } }\n  }\n}";
            _context5.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context5.sent;
            expected = {
              name: 'Margaery Tyrell',
              culture: 'Westeros',
              born: 'In 283 AC, at Highgarden',
              died: '',
              titles: ['Queen of the Seven Kingdoms'],
              aliases: ['The Little Queen', 'The Little Rose', 'Maid Margaery'],
              father: null,
              mother: null,
              spouse: {
                name: 'Renly Baratheon'
              },
              playedBy: ['Natalie Dormer'],
              tvSeries: ['Season 2', 'Season 3', 'Season 4', 'Season 5'],
              bookConnection: {
                edges: [{
                  node: {
                    name: 'A Game of Thrones'
                  }
                }]
              },
              childrenConnection: {
                edges: []
              },
              allegianceConnection: {
                edges: [{
                  node: {
                    name: 'House Tyrell of Highgarden'
                  }
                }]
              },
              povBookConnection: {
                edges: []
              }
            };
            expect(result.data.character).toEqual(expected);

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
            query = "{ allCharacters { edges { cursor, node { name } } } }";
            _context6.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context6.sent;
            expect(result.data.allCharacters.edges.length).toBe(2138);

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
            query = "{\n      allCharacters(first: 2) { edges { cursor, node { name } } }\n    }";
            _context7.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context7.sent;
            expect(result.data.allCharacters.edges.map(function (e) {
              return e.node.name;
            })).toEqual(['', 'Walder']);
            nextCursor = result.data.allCharacters.edges[1].cursor;
            nextQuery = "{ allCharacters(first: 2, after:\"".concat(nextCursor, "\") {\n      edges { cursor, node { culture } } }\n    }");
            _context7.next = 9;
            return (0, _got.gameOfThrones)(nextQuery);

          case 9:
            nextResult = _context7.sent;
            expect(nextResult.data.allCharacters.edges.map(function (e) {
              return e.node.culture;
            })).toEqual(['', 'Braavosi']);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  describe('Edge cases', function () {
    test('Returns null if no father is set',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8() {
      var query, result;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              query = "{ character(characterID: 1) { name, father { name } } }";
              _context8.next = 3;
              return (0, _got.gameOfThrones)(query);

            case 3:
              result = _context8.sent;
              expect(result.data.character.name).toBe('');
              expect(result.data.character.father).toBeNull();

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    test('Returns correctly if a father is set',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9() {
      var query, result;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              query = "{ character(characterID: 39) { name, father { name } } }";
              _context9.next = 3;
              return (0, _got.gameOfThrones)(query);

            case 3:
              result = _context9.sent;
              expect(result.data.character.name).toBe('Aegon II');
              expect(result.data.character.father.name).toBe('Viserys I');

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
});