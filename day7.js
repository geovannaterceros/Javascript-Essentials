console.log("Hola, este es el día 6 de JavaScript Essential Training");

const person1 = {
    name: "Alice"
};

const person2 = {
    name: "Bob"
};

console.log(person1 === person2); // false

const person3 = person1;
person3.age = 30;
console.log(person1); // { name: 'Alice', age: 30 }

const array1 = [1, 2, 3];
const array2 = array1;
array2.push(4);
console.log(array1); // [1, 2, 3, 4]
 /*Hasta aqui, podemos ver que copiamos la referencia de person1 a person3, 
   por lo que ambos apuntan al mismo objeto en memoria. Lo mismo ocurre con array1 y array2.
   Por eso, al modificar person3 o array2, también se modifica person1 y array1 respectivamente,
   ya que son el mismo objeto.
 */

const copiaPerson1 = { ...person1 };
copiaPerson1.name = "Charlie";
copiaPerson1.direction = "123 Main St";
console.log(copiaPerson1);

/* Para realizar una copia de un objeto en JavaScript, 
    podemos usar el operador de propagación (spread operator ...) */

const userOriginal ={
    name: "David",
    age: 25,
    email: "david@example.com",
    details: {
        address: "456 Elm St",
        phone: "555-1234",
        hobbies: ["reading", "gaming"]
    }
};

const userCopy = structuredClone(userOriginal);
userCopy.details.phone = "555-5678";

console.log(userOriginal); 
console.log("************************************************************")
console.log(userCopy); 

Object.preventExtensions(userCopy);
console.log("funcionara?");
console.log(userCopy); // David