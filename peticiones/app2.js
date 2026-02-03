// Ejercicio 2: El área de contenido necesita identificar qué publicaciones han generado interacción y
//cuáles no. Para ello, se requiere analizar las publicaciones y sus comentarios asociados.

// Requerimientos:
//• Consultar todas las publicaciones.
//• Consultar todos los comentarios.
//• Relacionar comentarios con sus publicaciones.
//• Identificar publicaciones sin comentarios.
//• Clasificar publicaciones según tengan o no comentarios.



// Funcion para obtener todas las publicaciones
const obtenerPublicaciones = async () => {
    // Hacemos una peticion GET para obtener todas las publicaciones
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

// Función principal que procesa los datos
const analizarPublicaciones = async () => {
    // Obtenemos la lista de publicaciones
    let publicaciones = await obtenerPublicaciones();
    
    // Obtenemos la lista de comentarios
    let comentarios = await obtenerComentarios();
    
    // Mensaje de inicio
    console.log('=== PUBLICACIONES CON Y SIN COMENTARIOS ===\n');
    
    // Mostramos cuántos posts y comentarios obtuvimos
    console.log(`Total de publicaciones: ${publicaciones.length}`);
    console.log(`Total de comentarios: ${comentarios.length}\n`);
    
    // Recorremos cada publicacion para analizar sus comentarios
    for (let i = 0; i < publicaciones.length; i++) {
        let post = publicaciones[i];
        
        // Contamos cuantos comentarios tiene esta publicación
        let contador = 0;
        
        // Recorremos todos los comentarios
        for (let j = 0; j < comentarios.length; j++) {
            let comentario = comentarios[j];
            
            // Si el postId del comentario coincide con el id de la publicación, contamos el comentario
            // Usamos == en lugar de === para evitar problemas con tipos de datos (número vs string)
            if (comentario.postId == post.id) {
                contador = contador + 1;
            }
        }
        
        // Determinamos el estado según la cantidad de comentarios
        let estado;
        if (contador > 0) {
            estado = "Con comentarios";
        } else {
            estado = "Sin comentarios";
        }
        
        // Mostramos el título de la publicación, número de comentarios y su estado
        console.log(`Título: ${post.title}`);
        console.log(`Comentarios: ${contador}`);
        console.log(`Estado: ${estado}`);
        console.log('---');
    }
    
    console.log('\n=== FIN DEL ANÁLISIS ===');
};

// Ejecutamos la función principal
analizarPublicaciones();