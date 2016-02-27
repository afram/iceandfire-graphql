Game of Thrones Wrapper
=============

This module allows the accessing of the Game of Thrones API in one of two ways:

 - The module contains a scrape of the Game of Thrones API, and exposes `getFromLocalUrl`,
a method that takes a Game of Thrones URL and returns our local copy of the result.
 - The module exposes `getFromRemoteUrl`, which will hit Game of Thrones to get the data.
This will use `fetch` when run locally, and will use `Parse.Cloud.httpRequest`
when run in cloud code.
