"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apiHelper = require("../apiHelper");

/* eslint-disable max-len */
describe('API Helper', function () {
  test('Gets a person',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var dusk, margery;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _apiHelper.getObjectFromUrl)('http://anapioficeandfire.com/api/characters/1/');

          case 2:
            dusk = _context.sent;
            expect(dusk.aliases[0]).toBe('The Daughter of the Dusk');
            _context.next = 6;
            return (0, _apiHelper.getObjectFromUrl)('http://anapioficeandfire.com/api/characters/16/');

          case 6:
            margery = _context.sent;
            expect(margery.name).toBe('Margaery Tyrell');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('Gets all pages at once',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var _ref3, objects, totalCount;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _apiHelper.getObjectsByType)('houses');

          case 2:
            _ref3 = _context2.sent;
            objects = _ref3.objects;
            totalCount = _ref3.totalCount;
            expect(objects.length).toBe(444);
            expect(totalCount).toBe(444);
            expect(objects[0].name).toBe('House Algood');

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('Gets first page and correct count',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var _ref5, objects, totalCount;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _apiHelper.getObjectsByType)('houses', {
              first: 5
            });

          case 2:
            _ref5 = _context3.sent;
            objects = _ref5.objects;
            totalCount = _ref5.totalCount;
            // Should only fetch the first page which has 10 items
            expect(objects.length).toBe(10); // Count should still be accurate, though

            expect(totalCount).toBe(444);
            expect(objects[0].name).toBe('House Algood');

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('Gets a house by ID',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var algood, godsGrace;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _apiHelper.getObjectFromTypeAndId)('houses', 1);

          case 2:
            algood = _context4.sent;
            expect(algood.name).toBe('House Algood');
            _context4.next = 6;
            return (0, _apiHelper.getObjectFromTypeAndId)('houses', 2);

          case 6:
            godsGrace = _context4.sent;
            expect(godsGrace.name).toBe('House Allyrion of Godsgrace');

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});