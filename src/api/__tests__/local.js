import { getFromLocalUrl } from '../local';

/* eslint-disable max-len */
describe('Local API Wrapper', () => {
  test('Gets a character', async () => {
    const margery = JSON.parse(
      await getFromLocalUrl('http://anapioficeandfire.com/api/characters/16/')
    );
    expect(margery.name).toBe('Margaery Tyrell');
    const baelish = JSON.parse(
      await getFromLocalUrl('http://anapioficeandfire.com/api/characters/823/')
    );
    expect(baelish.name).toBe('Petyr Baelish');
  });

  test('Gets pages', async () => {
    const firstCharacters = JSON.parse(
      await getFromLocalUrl(
        'http://anapioficeandfire.com/api/characters/?page=1'
      )
    );
    expect(firstCharacters.results.length).toBe(10);
    expect(firstCharacters.results[0].aliases[0]).toBe(
      'The Daughter of the Dusk'
    );
    const secondCharacters = JSON.parse(
      await getFromLocalUrl(
        'http://anapioficeandfire.com/api/characters/?page=2'
      )
    );
    expect(secondCharacters.results.length).toBe(10);
    expect(secondCharacters.results[0].aliases[0]).toBe('The waif');
  });

  test('Gets first page by default', async () => {
    const characters = JSON.parse(
      await getFromLocalUrl('http://anapioficeandfire.com/api/characters/')
    );
    expect(characters.results.length).toBe(10);
    expect(characters.results[0].aliases[0]).toBe('The Daughter of the Dusk');
  });
});
