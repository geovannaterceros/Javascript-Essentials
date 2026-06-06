export async function fetchFeriados(year = 2026, options = {}) {
  const url = `https://api.argentinadatos.com/v1/feriados/${year}`;
  const { headers } = options;

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json;
}

fetchFeriados(2026).then(feriados => console.log(feriados))
.catch(err => console.error(err));