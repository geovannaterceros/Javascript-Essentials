console.log(greet("Mario")); // "Hola, Mario!"

function greet(name){
    return `Hola, ${name}!`;
}

function doNothing(num1, num2){
    const Resultado = num1 + num2;
}

console.log(doNothing(5, 10)); // undefined, ya que la función no retorna nada

function mySuma(a=0, b=0){
    return a + b;  
}

console.log(mySuma(5, 10, 5, 5)); // 15
console.log(mySuma(5)); // NaN, ya que b es undefined

function mySumaVacia(){
    return arguments[0] + arguments[1];
}

console.log(mySumaVacia(5, 10)); // 15
console.log(mySumaVacia(5)); // NaN, ya que arguments[1] es undefined

function avarage(...numbers){
    let total = 0;
    for(const num of numbers){
        total += num;
    }
    return total / numbers.length;
}
        console.log(avarage(5, 10, 15)); // 10


const add = function sumar(a,b){
    return a + b;
}

console.log(add(5, 10)); // 15

let isClientVip = false;

const calculatePrice = isClientVip 
? function(price){ return price - 10; } 
: function(price){ return price; };

console.log(calculatePrice(100)); // 90, ya que isClientVip es true

console.log("callback***************");

const calcular = (a, b, operacion) => operacion(a, b);

const suma = (x, y) => x + y;

const resta = (x, y) => x - y;
const multiplicacion = (x, y) => x * y;
const division = (x, y) => y !== 0 ? x / y : "No se puede dividir por cero";

console.log(calcular(5, 10, suma));
console.log(calcular(5, 10, resta));
console.log(calcular(5, 10, multiplicacion));
console.log(calcular(5, 10, division));
console.log(calcular(5, 0, division)); // "No se puede dividir por cero"

console.log("Scope***************");

let globalVar = "Soy global";

console.log("Scope chain***************");

function outerFunction() {
    let outerVar = "Soy de la función externa"; 
}