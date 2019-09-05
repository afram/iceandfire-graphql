"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _local = require("../local");

/* eslint-disable max-len */
describe('Local API Wrapper', function () {
  test('Gets a character',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var margery, baelish;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = JSON;
            _context.next = 3;
            return (0, _local.getFromLocalUrl)('http://anapioficeandfire.com/api/characters/16/');

          case 3:
            _context.t1 = _context.sent;
            margery = _context.t0.parse.call(_context.t0, _context.t1);
            expect(margery.name).toBe('Margaery Tyrell');
            _context.t2 = JSON;
            _context.next = 9;
            return (0, _local.getFromLocalUrl)('http://anapioficeandfire.com/api/characters/823/');

          case 9:
            _context.t3 = _context.sent;
            baelish = _context.t2.parse.call(_context.t2, _context.t3);
            expect(baelish.name).toBe('Petyr Baelish');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('Gets pages',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var firstCharacters, secondCharacters;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = JSON;
            _context2.next = 3;
            return (0, _local.getFromLocalUrl)('http://anapioficeandfire.com/api/characters/?page=1');

          case 3:
            _context2.t1 = _context2.sent;
            firstCharacters = _context2.t0.parse.call(_context2.t0, _context2.t1);
            expect(firstCharacters.results.length).toBe(10);
            expect(firstCharacters.results[0].aliases[0]).toBe('The Daughter of the Dusk');
            _context2.t2 = JSON;
            _context2.next = 10;
            return (0, _local.getFromLocalUrl)('http://anapioficeandfire.com/api/characters/?page=2');

          case 10:
            _context2.t3 = _context2.sent;
            secondCharacters = _context2.t2.parse.call(_context2.t2, _context2.t3);
            expect(secondCharacters.results.length).toBe(10);
            expect(secondCharacters.results[0].aliases[0]).toBe('The waif');

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('Gets first page by default',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var characters;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = JSON;
            _context3.next = 3;
            return (0, _local.getFromLocalUrl)('http://anapioficeandfire.com/api/characters/');

          case 3:
            _context3.t1 = _context3.sent;
            characters = _context3.t0.parse.call(_context3.t0, _context3.t1);
            expect(characters.results.length).toBe(10);
            expect(characters.results[0].aliases[0]).toBe('The Daughter of the Dusk');

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});