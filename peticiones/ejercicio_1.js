// Función asíncrona que obtiene la lista de los usuarios
const usuarios = async () => {
    // Se realiza una consulta al endpoint de usuarios usando fetch
    const respuestaUser = await fetch('http://localhost:3000/users');
    // Se convierte a formato JSON y devuelve un arreglo con la información de los usuarios
    return await respuestaUser.json();
}
// Función asíncrona que obtiene los post de un usuario
const postUsuarios = async (id) => {
    // Se realiza una consulta al endpoint de los posts de un usuario en específico por medio del id usando fetch
    const respuestaPost = await fetch(`http://localhost:3000/posts?userId=${id}`);
    // Se convierte a formato JSON y devuelve un arreglo de los post del usuario
    return await respuestaPost.json();
}

// Llama a la función usuarios 
usuarios()
.then((usuario) => 
{
    // Se inicializa una constante que se le asigna con un arreglo vacío para guardar el resultado final
    const resultados = [];
    // recorre el arreglo de los usuarios
    usuario.map(({id, name}) => 
    {
        // Llama a la función postUsuarios la cual obtiene los post de cada usuario por medio del id
        postUsuarios(id)
        .then((post) => {
            // En el arreglo resultados se guarda el nombre del usuario y la cantidad de posts que tiene
            resultados.push({
                nombre : name,
                CantidadPosts: post.length 
            });
            // Condición que compara si la cantidad de resultados es igual a la cantidad total de usuarios
            if(resultados.length === usuario.length)
            {
                // Imprime el nombre del usuario y la cantidad de posts
                console.log(resultados);
            }
        })
    })
})
