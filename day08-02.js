const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    console.log(response);  

    if(!response.ok ){
        console.log("Error al llamar el API");
    }

    const users = await response.json();
    console.log(users);
};

fetchUsers();

const createPost = async (title, body) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body, userId: 1 })
    });

    console.log(response);

    if(!response.ok ){
        console.log("Error al crear el post");
    }

    const post = await response.json();
    console.log(post);
};

createPost("Titulo1", "Body from my post");
