"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFromLocalUrl = getFromLocalUrl;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cache = _interopRequireDefault(require("./cachedData/cache"));

/**
 * Given a URL of an object in the game of Thrones API, return the data
 * from our local cache.
 */
function getFromLocalUrl(_x) {
  return _getFromLocalUrl.apply(this, arguments);
}

function _getFromLocalUrl() {
  _getFromLocalUrl = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(url) {
    var text;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            text = _cache["default"][url];

            if (text) {
              _context.next = 3;
              break;
            }

            throw new Error("No entry in local cache for ".concat(url));

          case 3:
            if (process.env.NODE_ENV !== 'test') {
              console.log("Hit the local cache for ".concat(url, "."));
            }

            return _context.abrupt("return", text);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getFromLocalUrl.apply(this, arguments);
}

var _default = getFromLocalUrl;
exports["default"] = _default;