import {
  getObjectFromUrl,
  getObjectsByType,
  getObjectFromTypeAndId,
} from '../apiHelper';

/* eslint-disable max-len */
describe('API Helper', () => {
  test('Gets a person', async () => {
    const dusk = await getObjectFromUrl(
      'http://anapioficeandfire.com/api/characters/1/'
    );
    expect(dusk.aliases[0]).toBe('The Daughter of the Dusk');
    const margery = await getObjectFromUrl(
      'http://anapioficeandfire.com/api/characters/16/'
    );
    expect(margery.name).toBe('Margaery Tyrell');
  });

  test('Gets all pages at once', async () => {
    const { objects, totalCount } = await getObjectsByType('houses');
    expect(objects.length).toBe(444);
    expect(totalCount).toBe(444);
    expect(objects[0].name).toBe('House Algood');
  });

  test('Gets first page and correct count', async () => {
    const { objects, totalCount } = await getObjectsByType('houses', {
      first: 5,
    });
    // Should only fetch the first page which has 10 items
    expect(objects.length).toBe(10);
    // Count should still be accurate, though
    expect(totalCount).toBe(444);
    expect(objects[0].name).toBe('House Algood');
  });

  test('Gets a house by ID', async () => {
    const algood = await getObjectFromTypeAndId('houses', 1);
    expect(algood.name).toBe('House Algood');
    const godsGrace = await getObjectFromTypeAndId('houses', 2);
    expect(godsGrace.name).toBe('House Allyrion of Godsgrace');
  });
});
