/* @flow */
import gotData from './cachedData/cache';

/**
 * Given a URL of an object in the game of Thrones API, return the data
 * from our local cache.
 */
export async function getFromLocalUrl(url: string): Promise<string> {
  const text = gotData[url];
  if (!text) {
    throw new Error(`No entry in local cache for ${url}`);
  }
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Hit the local cache for ${url}.`);
  }
  return text;
}

export default getFromLocalUrl;
