/**
 * Given a URL of an object in the Game of Thrones API, return the data
 * from the server.
 *
 * This switches what abstraction it uses to fetch between isomorphic-fetch
 * and the Parse HTTP library so it can be used either locally or in cloud code.
 */
import fetch from 'isomorphic-fetch';

export async function getFromRemoteUrl(url) {
  try {
    const text = await getTextFromFetch(url);

    console.log(`Hit the GOT API for ${url}.`);
    return text;
  } catch (err) {
    console.error(`Error: Hit the GOT API for ${url} and got ${err}`);
    throw err;
  }
}

async function getTextFromFetch(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

export default getFromRemoteUrl;
