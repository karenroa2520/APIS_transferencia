
// Ejercicio 3: Un usuario del sistema desea consultar información puntual sobre una publicación
//específica y conocer si existe interacción asociada a ella.

//Requerimientos:
//• Consultar todas las publicaciones.
//• Buscar una publicación específica por su identificador.
//• Consultar los comentarios relacionados con esa publicación.
//• Validar si existen o no comentarios asociados.

// Funcion para obtener todas las publicaciones
const obtenerPublicaciones = async () => {
    // Hacemos una petición GET para obtener todas las publicaciones
    let respuesta = await fetch('http://localhost:3000/posts');
    // Convertimos la respuesta a formato JSON
    let datos = await respuesta.json();
    return datos;
};

// Función para obtener todos los comentarios
const obtenerComentarios = async () => {
    // Hacemos una petición GET para obtener todos los comentarios
    let respuesta = await fetch('http://localhost:3000/comments');
    // Convertimos la respuesta a formato JSON
    let datos = await respuesta.json();
    return datos;
};

// Función para buscar una publicación por su ID
const buscarPublicacionPorId = async (idBuscado) => {
    // Obtenemos todas las publicaciones
    let publicaciones = await obtenerPublicaciones();
    
    // Obtenemos todos los comentarios
    let comentarios = await obtenerComentarios();
    
    // Mensaje de inicio
    console.log('=== BÚSQUEDA DE PUBLICACIÓN ===\n');
    
    // Buscamos la publicación con el ID especificado
    let publicacionEncontrada = null;
    
    for (let i = 0; i < publicaciones.length; i++) {
        let post = publicaciones[i];
        
        // Comparamos el ID buscado con el ID de cada publicación
        if (post.id == idBuscado) {
            publicacionEncontrada = post;
            break; // Salimos del bucle cuando encontramos la publicación
        }
    }
    
    // Verificamos si encontramos la publicación
    if (publicacionEncontrada === null) {
        console.log(`No se encontró ninguna publicación con el ID ${idBuscado}`);
        return;
    }
    
    // Contamos los comentarios de esta publicación
    let contadorComentarios = 0;
    
    for (let j = 0; j < comentarios.length; j++) {
        let comentario = comentarios[j];
        
        // Si el postId del comentario coincide con el id de la publicación
        if (comentario.postId == publicacionEncontrada.id) {
            contadorComentarios = contadorComentarios + 1;
        }
    }
    
    // Mostramos la información de la publicación
    console.log(`ID de la publicación: ${publicacionEncontrada.id}`);
    console.log(`Título: ${publicacionEncontrada.title}`);
    console.log(`Contenido: ${publicacionEncontrada.body}`);
    console.log(`Número de comentarios: ${contadorComentarios}`);
    
    // Mensaje final
    console.log('\n=== BÚSQUEDA COMPLETADA ===');
};

// Ejecutamos la función buscando la publicación con ID = 1
// Puedes cambiar el número para buscar otra publicación
buscarPublicacionPorId(1);