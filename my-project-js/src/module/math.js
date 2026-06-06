export const sum = (a, b) => a + b;

export const subtract = (a, b) => a - b;

export const multiply = (a, b) => a * b;

export const divide = (a, b) => {
    if (b === 0) {
        throw new Error("No se puede dividir por cero");
    }
    return a / b;
};

export const power = (a, b) => {
    return Math.pow(a, b);
}