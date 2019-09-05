"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFromRemoteUrl = getFromRemoteUrl;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

/**
 * Given a URL of an object in the Game of Thrones API, return the data
 * from the server.
 *
 * This switches what abstraction it uses to fetch between isomorphic-fetch
 * and the Parse HTTP library so it can be used either locally or in cloud code.
 */
function getFromRemoteUrl(_x) {
  return _getFromRemoteUrl.apply(this, arguments);
}

function _getFromRemoteUrl() {
  _getFromRemoteUrl = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(url) {
    var text;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getTextFromFetch(url);

          case 3:
            text = _context.sent;
            console.log("Hit the GOT API for ".concat(url, "."));
            return _context.abrupt("return", text);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error("Error: Hit the GOT API for ".concat(url, " and got ").concat(_context.t0));
            throw _context.t0;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _getFromRemoteUrl.apply(this, arguments);
}

function getTextFromFetch(_x2) {
  return _getTextFromFetch.apply(this, arguments);
}

function _getTextFromFetch() {
  _getTextFromFetch = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(url) {
    var response, text;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _isomorphicFetch["default"])(url);

          case 2:
            response = _context2.sent;
            _context2.next = 5;
            return response.text();

          case 5:
            text = _context2.sent;
            return _context2.abrupt("return", text);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getTextFromFetch.apply(this, arguments);
}

var _default = getFromRemoteUrl;
exports["default"] = _default;