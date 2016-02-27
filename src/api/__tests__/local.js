import { expect } from 'chai';
import { describe, it } from 'mocha';
import { getFromLocalUrl } from '../local';

/* eslint-disable max-len */
describe('Local API Wrapper', () => {
  it('Gets a character', async () => {
    var margery =
      JSON.parse(await getFromLocalUrl('http://anapioficeandfire.com/api/characters/16/'));
    expect(margery.name).to.equal('Margaery Tyrell');
    var baelish =
      JSON.parse(await getFromLocalUrl('http://anapioficeandfire.com/api/characters/823/'));
    expect(baelish.name).to.equal('Petyr Baelish');
  });

  it('Gets pages', async () => {
    var firstCharacters =
      JSON.parse(await getFromLocalUrl('http://anapioficeandfire.com/api/characters/?page=1'));
    expect(firstCharacters.results.length).to.equal(10);
    expect(firstCharacters.results[0].aliases[0]).to.equal('The Daughter of the Dusk');
    var secondCharacters =
      JSON.parse(await getFromLocalUrl('http://anapioficeandfire.com/api/characters/?page=2'));
    expect(secondCharacters.results.length).to.equal(10);
    expect(secondCharacters.results[0].aliases[0]).to.equal('The waif');
  });

  it('Gets first page by default', async () => {
    var characters =
      JSON.parse(await getFromLocalUrl('http://anapioficeandfire.com/api/characters/'));
    expect(characters.results.length).to.equal(10);
    expect(characters.results[0].aliases[0]).to.equal('The Daughter of the Dusk');
  });
});
