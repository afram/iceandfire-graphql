import { expect } from 'chai';
import { describe, it } from 'mocha';

import {
  getObjectFromUrl,
  getObjectsByType,
  getObjectFromTypeAndId,
} from '../apiHelper';

/* eslint-disable max-len */
describe('API Helper', () => {
  it('Gets a person', async () => {
    const dusk = await getObjectFromUrl(
      'http://anapioficeandfire.com/api/characters/1/'
    );
    expect(dusk.aliases[0]).to.equal('The Daughter of the Dusk');
    const margery = await getObjectFromUrl(
      'http://anapioficeandfire.com/api/characters/16/'
    );
    expect(margery.name).to.equal('Margaery Tyrell');
  });

  it('Gets all pages at once', async () => {
    const { objects, totalCount } = await getObjectsByType('houses');
    expect(objects.length).to.equal(444);
    expect(totalCount).to.equal(444);
    expect(objects[0].name).to.equal('House Algood');
  });

  it('Gets first page and correct count', async () => {
    const { objects, totalCount } = await getObjectsByType('houses', {
      first: 5,
    });
    // Should only fetch the first page which has 10 items
    expect(objects.length).to.equal(10);
    // Count should still be accurate, though
    expect(totalCount).to.equal(444);
    expect(objects[0].name).to.equal('House Algood');
  });

  it('Gets a house by ID', async () => {
    const algood = await getObjectFromTypeAndId('houses', 1);
    expect(algood.name).to.equal('House Algood');
    const godsGrace = await getObjectFromTypeAndId('houses', 2);
    expect(godsGrace.name).to.equal('House Allyrion of Godsgrace');
  });
});
