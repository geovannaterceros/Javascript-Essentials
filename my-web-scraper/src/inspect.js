import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://www.infocasas.com.bo/venta/inmuebles/cochabamba/pagina2';

axios.get(url)
  .then(res => {
    const $ = cheerio.load(res.data);
    const firstCard = $('.listingsWrapper .listingCard').first();
    console.log('CARD CLASS:', firstCard.attr('class'));
    console.log('--- CHILD ELEMENTS WITH CLASS ---');
    firstCard.find('[class]').each((i, el) => {
      const $el = $(el);
      const cls = $el.attr('class');
      const text = $el.text().trim().replace(/\s+/g, ' ');
      if (text.length > 0 && text.length < 200) {
        console.log(i, cls, '=>', text);
      }
    });
    const firstLink = firstCard.find('a[href]').first().attr('href');
    console.log('FIRST LINK:', firstLink);
    const detailUrl = new URL(firstLink, url).toString();
    console.log('FIRST DETAIL URL:', detailUrl);

    axios.get(detailUrl).then(detailRes => {
      const $$ = cheerio.load(detailRes.data);
      const descriptionNodes = [];
      $$('*').each((i, el) => {
        const $el = $$(el);
        const text = $el.text().replace(/\s+/g, ' ').trim();
        if (/\bDescripción\b|\bDescripcion\b/i.test(text)) {
          descriptionNodes.push({ tag: el.tagName, class: $el.attr('class'), text: text.slice(0, 500) });
        }
      });
      console.log('DETAIL DESCRIPTION NODES:', descriptionNodes.slice(0, 20));
    }).catch(err => {
      console.error('DETAIL PAGE ERROR:', err.message);
    });
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
