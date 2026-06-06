console.log("---------------");

let valor1 = 15.5;
let valor2 = 15;
let valor3 = "hi";
let valor4 = true;
let valor5 = -2;
let valor6 = -2.1;
let valor7 = "3";
let valor8 = "-3.8";

const resultado = function procesarEntrada(valor){

    if(valor === null){
        return "Es null";
    }

    if(typeof valor === "boolean"){
        return "Es boolean";
    }

   if(typeof valor === "string"){

        let numero = parseFloat(valor);

        if(!Number.isNaN(numero)){
            valor = numero;
        } else {
            return "Es string";
        }
    }

    if(typeof valor === "number"){

        if(Number.isNaN(valor)){
            return "No es un numero valido";
        }

        if(!Number.isFinite(valor)){
            return "Es infinito";
        }

        if(Number.isInteger(valor)){

            if(valor > 0){
                return "Es numero positivo";
            }

            if(valor < 0){
                return "Es numero negativo";
            }

            return "Es cero";
        }

        if(valor % 1 !== 0){

            if(valor > 0){
                return "Es decimal positivo";
            }

            if(valor < 0){
                return "Es decimal negativo";
            }
        }
    }

    return "Es otra cosa";
}

console.log("Resultado:", resultado(valor1));
console.log("Resultado:", resultado(valor2));
console.log("Resultado:", resultado(valor3));
console.log("Resultado:", resultado(valor4));
console.log("Resultado:", resultado(valor5));
console.log("Resultado:", resultado(valor6));
console.log("Resultado:", resultado(valor7));
console.log("Resultado:", resultado(valor8));
console.log("Resultado:", resultado(null));
console.log("Resultado:", resultado(NaN));
console.log("Resultado:", resultado(true));
console.log("Resultado:", resultado("12dfdf"));
console.log("Resultado:", resultado(10/0));
console.log("Resultado:", resultado("-12.5dfdf"));

function analizarTokens(text){
    const tokens = text.split(/\s+/);
    const resumen = {};

    tokens.forEach(raw => {
        const cleaned = raw.replace(/^[\s"'“”‘’\(\)\[\]\{\},;:.]+|[\s"'“”‘’\(\)\[\]\{\},;:.]+$/g, '');
        let tipo = 'string';
        const lower = cleaned.toLowerCase();

        if(lower === 'true' || lower === 'false'){
            tipo = 'boolean';
        } else if(/^\$/.test(cleaned) && !Number.isNaN(parseFloat(cleaned.replace(/[$,]/g,'')))){
            tipo = 'currency';
        } else if(/%$/.test(cleaned) && !Number.isNaN(parseFloat(cleaned.replace(/[%\,]/g,'')))){
            tipo = 'percentage';
        } else if(/^[+-]?\d{3,4}$/.test(cleaned)){
            tipo = 'time';
        } else if(/^[apmAPM]{2}$/.test(cleaned)){
            tipo = 'meridiem';
        } else if(/^[+-]?\d+(?:\.\d+)?$/.test(cleaned.replace(/,/g,''))){
            if(cleaned.indexOf('.') === -1){
                tipo = 'integer';
            } else {
                tipo = 'decimal';
            }
        }

        resumen[tipo] = (resumen[tipo] || 0) + 1;
        console.log(`Token: "${raw}" => ${tipo}`);
    });

    console.log('Resumen de tokens:');
    Object.keys(resumen).sort().forEach(k => console.log(`${k}: ${resumen[k]}`));
}

const texto = `The international auction at Hall 4 opened at 0930 AM featuring a rare tech artifact with a starting bid of $1500, and within just 12 minutes, 3 aggressive bidders from 2 different countries drove the price up by 45.8% to finally close the deal at an incredible $2187.50. The automated database system immediately processed the transaction, setting the payment cleared status to true in 0.005 seconds and marking the shipping waiver to false because the item weighed over 10.5 kilograms. A secondary verification system checked if the buyer was an overseas collector, which returned a value of true, automatically triggering a 1.5% international handling fee alongside 8 standard domestic surcharges. Ultimately, after deducting the 0.25 entry tax and 6 separate bank processing costs, the auction house walked away with a clean net profit of $328.25 from that single hectic session.`;

console.log('\n--- Análisis de tokens ---');
analizarTokens(texto);

