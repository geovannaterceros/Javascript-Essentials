console.log("Inicio");
const fetchData = (id, callback) => {
  console.log('Fetching data...');
  // setTimeout schedules the callback on the task queue
  setTimeout(() => {
    // This runs after the current call stack is clear
    const data = { id: id, name: 'Alice' };
    callback(data);
    //callback(data, { message: "No se pudo obtener el usuario" });
  }, 1000);
};

fetchData(5, (data, error) => {
    if( error ){
        console.log(error);
        return;
    }
    console.log(`Ususario: ${data}`);
    console.log(data);
});

console.log("Fin");



function iniciarSesion(usuario, password, callback) {
    setTimeout(() => {
        console.log("1. Usuario autenticado con éxito.");
        const userResponse = { id: 101, nombre: "Carlos" }
        callback( userResponse );
    }, 1000);
}

function obtenerPosts(usuarioId, callback) {
    setTimeout(() => {
        console.log(`2. Posts obtenidos para el usuario ID: ${usuarioId}`);
        const posts = [{ id: 1, titulo: "Mi primer post" }, { id: 2, titulo: "Viaje a la playa" }]
        callback( posts );
    }, 1000);
}

function obtenerComentarios(postId, callback) {
    setTimeout(() => {
        console.log(`3. Comentarios obtenidos para el post ID: ${postId}`);
        const comments = ["¡Excelente post!", "Me encantó la información."];
        callback( comments );
    }, 1000);
}

iniciarSesion("usuario1", "sdasdasd", (usuario) => {
    obtenerPosts( usuario.id, (posts) => {
        const primerPost = posts[0];
        obtenerComentarios(primerPost.id, (comments) => {
            console.log("Resultado final: "+comments[0]);
        });
    });
});

console.log("----- Promise");

const myPromise = new Promise( (resolve) => {
    setTimeout(() => {
        resolve("Operacion exitosa");
    }, 1000);
});

myPromise.then( (resString) => console.log(resString) );

const checkAge = (age) => {
    return new Promise( (res, rej) => {
        if( age >= 18 ){
            res(`Access granted. Age ${age}`);
        } else {
            rej({ message: `Access denied`});
        }
    });
}

checkAge(30)
    .then( (message) => {
        console.log(message);
        return message;
    })
    .then( (response) => {
        console.log( response.toUpperCase());
    })
    .catch( (objError) => {
        console.log( objError.message );
    });