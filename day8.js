console.log("------Spread operator---------")

const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];

const combinedArr = [...arr1, ...arr2];
console.log(combinedArr); // [1, 2, 3, 4, 5, 6]

const defaultSettings = {
    theme: "light",
    notifications: true,
    autoSave: false
};

const userPreferences = {
    theme: "dark",
    autoSave: true
};
const finalSettings = { ...defaultSettings, ...userPreferences };
console.log(finalSettings); // { theme: 'dark', notifications: true, autoSave: true }

function iniciarSesionPromise(usuario, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("1. Usuario autenticado con éxito.");
            const userResponse = { id: 101, nombre: "Carlos" }
            resolve(userResponse);
        }, 1000);
    });
}

function obtenerPostsPromise(usuarioId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`2. Posts obtenidos para el usuario ID: ${usuarioId}`);
            const posts = [{ id: 1, titulo: "Mi primer post" }, { id: 2, titulo: "Viaje a la playa" }]
            resolve(posts);
        }, 1000);
    });
}

function obtenerComentariosPromise(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`3. Comentarios obtenidos para el post ID: ${postId}`);
            const comments = ["¡Excelente post!", "Me encantó la información."];
            resolve(comments);
        }, 1000);
    });
}

// iniciarSesionPromise("usuario", "contraseña")
//     .then( usuario => {
//         console.log(`Get user from post then: ${usuario.nombre}`);
//         return obtenerPostsPromise(usuario.id); 
//     })
//     .then( posts => {
//         console.log(`Get posts from comments then: ${posts.length} posts`);
//         return obtenerComentariosPromise(posts[0].id);
//     })
//     .then(comments => {
//         console.log(`First comment : ${comments[0]}`);
//     })
//     .catch( error => {
//         console.log(`Error: ${error}`);
//     })
//     .finally( () => {
//         console.log("Proceso finalizado");
//      });

console.log("------Async / await ---------");

 try {
    const usuario = await iniciarSesionPromise("usuario", "contraseña");
    console.log(`Get user from post then: ${usuario.nombre}`);
    const posts = await obtenerPostsPromise(usuario.id);
    console.log(`Get posts from comments then: ${posts.length} posts`);
    const comments = await obtenerComentariosPromise(posts[0].id);
    console.log(`First comment : ${comments[0]}`);
 } catch (error) {
    console.log(`Error: ${error}`);
 } finally {
    console.log("Proceso finalizado");
 }