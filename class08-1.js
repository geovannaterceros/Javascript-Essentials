console.log("------Promise ---------");

function squareNumber(num) {
    if( typeof num !== "number" ) {
        throw new Error("El valor no es un número");
    }
    let resultado = num * num;
    console.log(`El resultado de ${num} al cuadrado es: ${resultado}`);
    return resultado;
}

try {
    squareNumber(5); // 25
    squareNumber("5"); // Error: El valor no es un número
} catch (error) {
    console.log(`Error: ${error}`);
}