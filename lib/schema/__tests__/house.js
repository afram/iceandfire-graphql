"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _got = require("./got");

describe('House type', function () {
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
            query = "{ house(houseID: 1) { name } }";
            _context.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context.sent;
            expect(result.data.house.name).toBe('House Algood');

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
            query = "{ house(houseID: 2) { name } }";
            _context2.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context2.sent;
            expect(result.data.house.name).toBe('House Allyrion of Godsgrace');

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
            query = "{ house(houseID: 1) { id, name } }";
            _context3.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context3.sent;
            nextQuery = "{ house(id: \"".concat(result.data.house.id, "\") { id, name } }");
            _context3.next = 7;
            return (0, _got.gameOfThrones)(nextQuery);

          case 7:
            nextResult = _context3.sent;
            expect(result.data.house.name).toBe('House Algood');
            expect(nextResult.data.house.name).toBe('House Algood');
            expect(result.data.house.id).toBe(nextResult.data.house.id);

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
            query = "{ house(houseID: 1) { id, name } }";
            _context4.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context4.sent;
            nextQuery = "{\n      node(id: \"".concat(result.data.house.id, "\") {\n        ... on House {\n          id\n          name\n        }\n      }\n    }");
            _context4.next = 7;
            return (0, _got.gameOfThrones)(nextQuery);

          case 7:
            nextResult = _context4.sent;
            expect(result.data.house.name).toBe('House Algood');
            expect(nextResult.data.node.name).toBe('House Algood');
            expect(result.data.house.id).toBe(nextResult.data.node.id);

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
            query = "\n{\n  house(houseID: 1) {\n    name\n    seats\n    region\n    coatOfArms\n    words\n    titles\n    currentLord { name }\n    founder { name }\n    founded\n    heir { name }\n    overlord { name }\n    diedOut\n    ancestralWeapons\n    cadetBranchConnection(first:1) { edges { node { name } } }\n    memberConnection(first:1) { edges { node { name } } }\n  }\n}";
            _context5.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context5.sent;
            expected = {
              name: 'House Algood',
              seats: [],
              region: 'The Westerlands',
              coatOfArms: 'A golden wreath, on a blue field with a gold border(Azure, a garland of laurel within a bordure or)',
              words: '',
              titles: [],
              currentLord: null,
              founder: null,
              founded: '',
              heir: null,
              overlord: {
                name: 'House Lannister of Casterly Rock'
              },
              diedOut: '',
              ancestralWeapons: [],
              cadetBranchConnection: {
                edges: []
              },
              memberConnection: {
                edges: []
              }
            };
            expect(result.data.house).toEqual(expected);

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
            query = "{ allHouses { edges { cursor, node { name } } } }";
            _context6.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context6.sent;
            expect(result.data.allHouses.edges.length).toBe(444);

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
            query = "{\n      allHouses(first: 2) { edges { cursor, node { name } } }\n    }";
            _context7.next = 3;
            return (0, _got.gameOfThrones)(query);

          case 3:
            result = _context7.sent;
            expect(result.data.allHouses.edges.map(function (e) {
              return e.node.name;
            })).toEqual(['House Algood', 'House Allyrion of Godsgrace']);
            nextCursor = result.data.allHouses.edges[1].cursor;
            nextQuery = "{ allHouses(first: 2, after:\"".concat(nextCursor, "\") {\n      edges { cursor, node { name } } }\n    }");
            _context7.next = 9;
            return (0, _got.gameOfThrones)(nextQuery);

          case 9:
            nextResult = _context7.sent;
            expect(nextResult.data.allHouses.edges.map(function (e) {
              return e.node.name;
            })).toEqual(['House Amber', 'House Ambrose']);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
});