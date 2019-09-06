![](https://github.com/aparedes/iceandfire-graphql/workflows/building/badge.svg)

An API of Ice and Fire GraphQL Wrapper
=====================

A wrapper around the [Game of Thrones API](http://anapioficeandfire.com) built using GraphQL.

This implementation is heavily inspired (read copious amounts of copy and paste) by Facebook's own wrapper around [SWAPI](http://swapi.co),
which can be found on the [swapi-graphql](https://github.com/graphql/swapi-graphql) Github page

Uses:

* [graphql-js](https://github.com/graphql/graphql-js) - a JavaScript GraphQL runtime.
* [DataLoader](https://github.com/facebook/dataloader) - for coalescing and caching fetches.
* [express-graphql](https://github.com/graphql/express-graphql) - to provide HTTP access to GraphQL.
* [GraphiQL](https://github.com/graphql/graphiql) - for easy exploration of this GraphQL server.


A working demo is available at [https://aqueous-citadel-58469.herokuapp.com](https://aqueous-citadel-58469.herokuapp.com)

Please be patient with the above link. Heroku puts dynos to sleep if inactive for 30 minutes. The server should be responsive within 5 seconds at most on initial visit. Please report any issues you come across.

## Getting Started

Install dependencies with

```sh
npm install
```

## Game of Thrones Wrapper

The GOT API wrapper is in `./schema`. It can be tested with:

```sh
npm test
```

## Local Server

A local express server is in `./server`. It can be run with:

```sh
npm start
```

A GraphiQL instance will be opened at http://localhost:PORT/ to
explore the API.

