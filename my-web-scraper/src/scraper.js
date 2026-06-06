import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://www.infocasas.com.bo';

const cleanText = (text) => text.replace(/\s+/g, ' ').trim();

export async function scrapeFirstListing(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const firstCard = $('.listingsWrapper .listingCard').first();
  if (!firstCard.length) return null;

  const price = cleanText(firstCard.find('.lc-price .main-price').first().text() || firstCard.find('.lc-price').first().text() || '');
  const location = cleanText(firstCard.find('.lc-location').first().text() || '');
  const detail = cleanText(firstCard.find('.lc-title').first().text() || firstCard.find('.lc-typologyContainer').first().text() || '');
  const typology = cleanText(firstCard.find('.lc-typologyContainer').first().text() || '');
  const relativeLink = firstCard.find('a[href]').first().attr('href');
  const detailUrl = relativeLink ? new URL(relativeLink, BASE_URL).toString() : null;

  let description = '';
  if (detailUrl) {
    const detailRes = await axios.get(detailUrl);
    const $$ = cheerio.load(detailRes.data);
    description = cleanText(($$('.description-container').first().text() || '').replace(/Descripción/gi, '').replace(/✅/g, ''));
  }

  return {
    price,
    location,
    detail,
    typology,
    detailUrl,
    description,
  };
}

/**
 * Extrae TODOS los anuncios de una página en un array
 */
export async function scrapeAllListings(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const cards = $('.listingsWrapper .listingCard');
  const results = [];

  console.log(`Encontrados ${cards.length} anuncios`);

  for (let i = 0; i < cards.length; i++) {
    const card = $(cards[i]);
    
    const price = cleanText(card.find('.lc-price .main-price').first().text() || card.find('.lc-price').first().text() || '');
    const location = cleanText(card.find('.lc-location').first().text() || '');
    const detail = cleanText(card.find('.lc-title').first().text() || card.find('.lc-typologyContainer').first().text() || '');
    const typology = cleanText(card.find('.lc-typologyContainer').first().text() || '');
    const relativeLink = card.find('a[href]').first().attr('href');
    const detailUrl = relativeLink ? new URL(relativeLink, BASE_URL).toString() : null;

  let description = '';
  if (detailUrl) {
    const detailRes = await axios.get(detailUrl);
    const $$ = cheerio.load(detailRes.data);
    description = cleanText(($$('.description-container').first().text() || '').replace(/Descripción/gi, '').replace(/✅/g, ''));
  }

    results.push({
      index: i + 1,
      price,
      location,
      detail,
      typology,
      detailUrl,
      description: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
    });
  }

  return results;
}
