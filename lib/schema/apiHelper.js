"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getObjectFromUrl = getObjectFromUrl;
exports.getObjectFromTypeAndId = getObjectFromTypeAndId;
exports.getObjectsByType = getObjectsByType;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dataloader = _interopRequireDefault(require("dataloader"));

var _api = require("../api");

var localUrlLoader = new _dataloader["default"](function (urls) {
  return Promise.all(urls.map(_api.getFromLocalUrl));
});
/**
 * Objects returned from GOT API don't have an ID field, so add one.
 */

function objectWithId(obj) {
  // eslint-disable-next-line prefer-destructuring
  obj.id = obj.url.split('/')[5];
  return obj;
}
/**
 * Given an object URL, fetch it, append the ID to it, and return it.
 */


function getObjectFromUrl(_x) {
  return _getObjectFromUrl.apply(this, arguments);
}
/**
 * Given a type and ID, get the object with the ID.
 */


function _getObjectFromUrl() {
  _getObjectFromUrl = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(url) {
    var dataString, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return localUrlLoader.load(url);

          case 2:
            dataString = _context.sent;
            data = JSON.parse(dataString);
            return _context.abrupt("return", objectWithId(data));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getObjectFromUrl.apply(this, arguments);
}

function getObjectFromTypeAndId(_x2, _x3) {
  return _getObjectFromTypeAndId.apply(this, arguments);
}
/**
 * Quick helper method, if the user just passes `first`, we can stop
 * fetching once we have that many items.
 */


function _getObjectFromTypeAndId() {
  _getObjectFromTypeAndId = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(type, id) {
    var response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getObjectFromUrl("http://anapioficeandfire.com/api/".concat(type, "/").concat(id, "/"));

          case 2:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getObjectFromTypeAndId.apply(this, arguments);
}

function doneFetching(objects, args) {
  if (!args || args.after || args.before || args.last || !args.first) {
    return false;
  }

  return objects.length >= args.first;
}

/**
 * Given a type, fetch all of the pages, and join the objects together
 */
function getObjectsByType(_x4, _x5) {
  return _getObjectsByType.apply(this, arguments);
}

function _getObjectsByType() {
  _getObjectsByType = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(type, args) {
    var objects, totalCount, nextUrl, pageData, parsedPageData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            objects = [];
            totalCount = 0;
            nextUrl = "http://anapioficeandfire.com/api/".concat(type, "/");

          case 3:
            if (!(nextUrl && !doneFetching(objects, args))) {
              _context3.next = 13;
              break;
            }

            _context3.next = 6;
            return localUrlLoader.load(nextUrl);

          case 6:
            pageData = _context3.sent;
            parsedPageData = JSON.parse(pageData);
            totalCount = parsedPageData.count;
            objects = objects.concat(parsedPageData.results.map(objectWithId));
            nextUrl = parsedPageData.next;
            _context3.next = 3;
            break;

          case 13:
            return _context3.abrupt("return", {
              objects: objects,
              totalCount: totalCount
            });

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getObjectsByType.apply(this, arguments);
}