console.log("funciones de primero orden***************");

console.log("funciones en composicion***************");

const applyDiscount = price => price * 0.9;
const addTax = price => price * 1.15;

const calculateFinalPrice = price => addTax (applyDiscount(price));

console.log(calculateFinalPrice(100)); // 103.5

console.log("funciones con corrying***************");

const curriedSum = a => b => c => a + b + c; 

console.log(curriedSum(5)(10)(15)); // 30

console.log("Closure***************");

const createCounter = () => {
    let count = 0;
    return () => {
        count++;
        return count;
    };
}

const counter = createCounter();
const counter2 = createCounter();

console.log(counter());
console.log(counter());
console.log(counter());

console.log(counter2());
console.log(counter2());


const filterNumbers = (number, test) => {
    let resultado = [];
    for (const num of number) {
        if (test(num)) {
            resultado.push(num);    
        }
    }
    return resultado;
}
 const myNumbers = [1, 2, 3, 4, 5, 4, 8, 4, 3, 45 ];

console.log(filterNumbers(myNumbers, num => num > 3)); // [4, 5, 4, 8, 4, 45]
console.log(filterNumbers(myNumbers, num => num % 2 === 0)); // [2, 4, 8, 4]

console.log("function composition ***************");

const compose = (f, g) => x => f(g(x));

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const addOneThenMultiplyByTwo = compose(multiplyByTwo, addOne);

console.log(addOneThenMultiplyByTwo(5)); // (5 + 1) * 2 = 12

console.log("objetos    ***************"); 

const name = "Alice";
const age = 30;
const person = { name, age };
console.log(person); // { name: 'Alice', age: 30 }

const field ='email';

const profile = {
    name: 'Bob',
    [field]: 'bob@example.com',
    [`${field}Verified`]: true,
};

console.log(profile.email);
console.log(profile.emailVerified);

const userFn = {
    name: 'Charlie',
    greet() {
        return `Hello, ${this.name}!`;  
    },
}

console.log(userFn.greet()); // Hello, Charlie!

console.log("destructuring    ***************");

const user = {
    name_u: 'Dave',
    age_u: 25,
    email_u: 'dave@example.com'
};

const { name_u, age_u, email_u } = user;
console.log(name_u);
console.log(age_u);
console.log(email_u);
