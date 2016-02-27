/* eslint-disable no-sync */

global.Promise = require('babel-runtime/core-js/promise').default;

var omit = require('lodash.omit');
var fetch = require('isomorphic-fetch');

/**
 * The API prefix
 */
var prefix = 'http://anapioficeandfire.com/api/';

/**
 * A map from field names to the GOT type we should map the IDs to.
 */
var fieldTypes = {
  allegiances: {type: 'house', name: 'swornMembers'},
  books: {type: 'book', name: 'characters'},
  povBooks: {type: 'book', name: 'povCharacters'},
  currentLord: {type: 'character', name: 'currentLordOfHouses'},
  founder: {type: 'character', name: 'foundedHouses'},
  characters: {type: 'character'},
  povCharacters: {type: 'character'},
  heir: {type: 'character'},
  father: {type: 'character'},
  mother: {type: 'character'},
  spouse: {type: 'character'},
  children: {type: 'character'},
  swornMembers: {type: 'character'},
  currentLordOfHouses: {type: 'house'},
  foundedHouses: {type: 'house'},
  overlord: {type: 'house'},
  cadetBranches: {type: 'house'}
};

/**
 * A map from the resource type to the "type" in the URL.
 */
var urlTypes = {
  book: 'books',
  character: 'characters',
  house: 'houses'
};

/**
 * Get the object URL for a given ID and type
 */
function objectUrl(id, type) {
  return prefix + urlTypes[type] + '/' + id + '/';
}

/**
 * Get the page URL for a given type, page number, and set of objects.
 */
function pageUrl(type, objects, num) {
  if (num !== null && isInvalidPage(objects, num)) {
    return null;
  }
  var url = prefix + urlTypes[type] + '/';
  if (num !== null) {
    url += '?page=' + num;
  }
  return url;
}

/**
 * Determines if a given page exists for a set of objects
 */
function isInvalidPage(objects, num) {
  return num <= 0 || ((num - 1) * 10) >= Object.keys(objects).length;
}

/**
 * Given the fields from the raw JSON, construct the REST API response.
 * Notably, things that are references in the raw JSON become URLs.
 */
function formatObject(object, type, id) {
  var formatted = {};
  var keys = Object.keys(object);
  keys.forEach(function (key) {
    if (fieldTypes[key]) {
      if (Array.isArray(object[key])) {
        formatted[key] = object[key].map(function (val) {
          return objectUrl(val, fieldTypes[key].type);
        });
      } else {
        formatted[key] = objectUrl(object[key], fieldTypes[key].type);
      }
    } else {
      formatted[key] = object[key];
    }
  });
  formatted.url = objectUrl(id, type);
  return formatted;
}

/**
 * Given a type, a set of objects, and a page number, return the REST
 * API response for that page.
 */
function makePage(type, objects, num) {
  return {
    count: Object.keys(objects).length,
    previous: pageUrl(type, objects, num - 1),
    next: pageUrl(type, objects, num + 1),
    results: Object.keys(objects).slice(
      (num - 1) * 10,
      num * 10
    ).map(function (objectId) {
      return formatObject(objects[objectId], type, objectId);
    })
  };
}

/**
 * Given a type and list of objects, add both the object URLs and the page URLs
 * to the cache.
 */
function addTypeToCache(cache, type, objects) {
  Object.keys(objects).forEach(function (objectId) {
    cache[objectUrl(objectId, type)] =
      JSON.stringify(formatObject(objects[objectId], type, objectId));
  });
  for (var i = 1; !isInvalidPage(objects, i); i++) {
    var page = makePage(type, objects, i);
    cache[pageUrl(type, objects, i)] = JSON.stringify(page);
    if (i === 1) {
      cache[pageUrl(type, objects, null)] = JSON.stringify(page);
    }
  }
  return cache;
}

/**
 * Given the objects, construct the cache from URL to REST response.
 */
function getCacheFromObjects(objects) {
  var cache = {};
  Object.keys(objects).forEach(
    function (type) {
      addTypeToCache(cache, type, objects[type]);
    }
  );
  return cache;
}

/**
 * Given the fixture, deduce the type based on fields
 * @param fixture
 */
function getType(fixture) {
  if (fixture.ISBN) { return 'book'; }
  if (fixture.Aliases) { return 'character'; }
  if (fixture.Seats) { return 'house'; }
  throw new Error('unable to match type for fixture: ' +
    JSON.stringify(fixture));
}

function decapitaliseKeys(obj) {
  return Object.keys(obj).reduce(function (newObj, key) {
    var newKey = key.charAt(0).toLocaleLowerCase() + key.slice(1);
    newObj[newKey] = obj[key];
    return newObj;
  }, {});
}

/**
 * Given the data so far, augment the data with the info in the fixture if it
 * is a not a transport.
 */
function addObjects(data, fixture) {
  var type = getType(fixture);
  if (!data[type]) {
    data[type] = {};
  }
  data[type][fixture.Id] = decapitaliseKeys(omit(fixture, 'Id'));
  return data;
}


/**
 * Given a list of the parsed fixtures, get the REST objects
 * responses by type and ID.
 */
function getObjectsFromFixtures(fixtures) {
  return fixtures.reduce(
    addObjects,
    {}
  );
}

function addReverseData(objects, type, objectId, object) {
  var keys = Object.keys(object);
  keys.forEach(function (key) {
    if (fieldTypes[key]) {
      var foreignType = fieldTypes[key].type;
      var foreignFieldName = fieldTypes[key].name || urlTypes[type];
      if (Array.isArray(object[key])) {
        object[key].forEach(function (foreignId) {
          if (objects[foreignType][foreignId]) {
            if (!objects[foreignType][foreignId][foreignFieldName]) {
              objects[foreignType][foreignId][foreignFieldName] = [];
            }
            objects[foreignType][foreignId][foreignFieldName].push(
              parseInt(objectId, 10)
            );
          }
        });
      } else {
        var foreignId = object[key];
        if (foreignId) {
          if (!objects[foreignType][foreignId][foreignFieldName]) {
            objects[foreignType][foreignId][foreignFieldName] = [];
          }
          objects[foreignType][foreignId][foreignFieldName].push(
            parseInt(objectId, 10)
          );
        }
      }
    }
  });
}

/**
 * Ine fixtures only contain one directional edges in some cases; populate the
 * reverse edges.
 */
function populateReverseMaps(objects) {
  Object.keys(objects).forEach(function (type) {
    Object.keys(objects[type]).forEach(function (objectId) {
      var object = objects[type][objectId];
      addReverseData(objects, type, objectId, object);
    });
  });
}

/**
 * The URL on github for the JSON fixture of this type.
 * using own repo as JSON error in original (PR submitted)
 */
function githubUrlForType(type) {
  return 'https://raw.githubusercontent.com/afram/AnApiOfIceAndFire/master/' +
    'AnApiOfIceAndFire.Data.Feeder/Data/' + type + '.json';
}

/**
 * Fetches and parses JSON from a URL
 */
function fetchFromUrl(url) {
  return fetch(url).then(function (fetched) {
    return fetched.text();
  }).then(function (text) {
    return JSON.parse(text);
  });
}

/**
 * Iterate through the types, fetch from the URL, convert the results into
 * objects, then generate and print the cache.
 */
var types = [
  'books',
  'characters',
  'houses'
];
Promise.all(types.map(githubUrlForType).map(fetchFromUrl)).then(
  function (fixturesList) {
    var fixtures = [].concat.apply([], fixturesList);
    var objects = getObjectsFromFixtures(fixtures);
    populateReverseMaps(objects);
    var cache = getCacheFromObjects(objects);
    console.log(
      '/*eslint-disable */\n' +
      '/* Generated by combine.js */\n' +
      'var data = ' + JSON.stringify(cache, null, 2) + ';\n' +
      'export default data;'
    );
  }
).catch(function (err) {
  console.error(err);
});
