// Ejemplo de regex: valida cadenas que empiezan con "a", tienen uno o más dígitos y terminan con "b"
const regex = /^a\d+b$/;

const ejemplos = [
  'a123b',  // coincide
  'ab',     // no coincide: falta un dígito
  'a45bc',  // no coincide: hay caracteres extra después de b
  'a0b',    // coincide
];

for (const texto of ejemplos) {
  const coincide = regex.test(texto);
  console.log(`${texto} => ${coincide ? 'coincide' : 'no coincide'}`);
}

// Explicación:
// ^  : inicio de la cadena
// a  : la letra "a"
// \d+: uno o más dígitos (0-9)
// b  : la letra "b"
// $  : fin de la cadena

// Ejemplo específico de test() y match():
const texto = 'a123b';
const regexTest = /^a\d+b$/;
const usaTest = regexTest.test(texto);
console.log(`test(): ${texto} => ${usaTest}`); // true

const regexMatch = /(\d+)/; // busca dígitos dentro de la cadena
const resultadoMatch = texto.match(regexMatch);
console.log('match():', resultadoMatch);
// match() devuelve un arreglo con la porción encontrada, por ejemplo ['123']

console.log('--- Fin del ejemplo ---');
console.log('--- Ejercicio 4 ordenar ascendente y descendente un array ---');

const numeros = [5, 2, 9, 1, 5, 6];

const ordenAscendente = (numeros) => {
  return numeros.sort((a, b) => a - b);
};

const ordenDescendente = (numeros) => {
  return numeros.sort((a, b) => b - a);
};

console.log('Orden ascendente:', ordenAscendente(numeros));
console.log('Orden descendente:', ordenDescendente(numeros));
