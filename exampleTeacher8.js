//const fetchUsers = () => {
    //const response = await fetch('https://jsonplaceholder.typicode.com/users');

//     fetch('https://jsonplaceholder.typicode.com/users').then( async (response) => {
//         console.log(response);

//         if( !response.ok ){
//             console.log("Error al llamar el API");
//         }

//         const response2 = response.clone();

//         const usuarios = response.json();

//         const usuariosStr = await response2.text(); 
//         console.log("STR: "+usuariosStr);

//         return usuarios
//         //console.log( users );

//     }).then( (usuarios) => {
//         console.log( usuarios[0]);
//     });

//     //console.log("Response", response);

    
// }

// fetchUsers();

// const createPost = async (title, body) => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify( {title, body, userId: 1} )
//     });

//     if( !response.ok ){
//         throw new Error("Unable to make a POST request");
//     }
//     const created = await response.json();
//     console.log( created );
// }

// createPost("Titulo1", "Body from my post");



const url = 'https://randomuser.me/api/';

const createGet = async (url) => {
    const response = await fetch(url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
     
    if( !response.ok ){
        throw new Error("Unable to make a GET request");
    }

    console.log(response.body);
};
createGet(url);