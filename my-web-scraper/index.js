import { scrapeAllListings } from './src/scraper.js';

(async () => {
  const listings = await scrapeAllListings('https://www.infocasas.com.bo/venta/inmuebles/cochabamba/pagina2');
  console.log('TODOS LOS ANUNCIOS:');
  console.log(JSON.stringify(listings, null, 2));
})();
