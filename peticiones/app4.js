
// Ejercicio 4: Antes de eliminar una publicación, el sistema debe validar si dicha publicación tiene
//comentarios asociados. Si tiene comentarios, no debe eliminarse; de lo contrario, puede proceder.

//Requerimientos:
//• Consultar las publicaciones.
//• Consultar los comentarios.
//• Verificar si una publicación específica tiene comentarios.
//• Si no tiene comentarios, ejecutar la eliminación.
//• Validar el resultado mediante una nueva consulta.


// Funcion para obtener las publicaciones del servidor
const obtenerPublicaciones = async () => {
    // fetch hace una petición HTTP al servidor
    // 'http://localhost:3000/posts' es la dirección donde están las publicaciones
    let respuesta = await fetch('http://localhost:3000/posts');
    
    // Convertimos la respuesta a formato JSON para poder usar los datos
    let datos = await respuesta.json();
    
    // Devolvemos los datos obtenidos
    return datos;
};

// Funcion para obtener los comentarios del servidor
const obtenerComentarios = async () => {
    // Petición HTTP para obtener todos los comentarios
    let respuesta = await fetch('http://localhost:3000/comments');
    
    // Convertimos a JSON
    let datos = await respuesta.json();
    
    // Devolvemos los datos
    return datos;
};

// Función para eliminar una publicación
const eliminarPublicacion = async (id) => {
    // Petición HTTP DELETE para borrar una publicación
    // `${id}` se reemplaza con el número del ID que queremos eliminar
    let respuesta = await fetch(`http://localhost:3000/posts/${id}`, {
        // method: 'DELETE' indica que queremos eliminar algo
        method: 'DELETE'
    });
    
    // Devolvemos la respuesta del servidor
    return respuesta;
};

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================

// Esta función hace todo el proceso de validación y eliminación
// Recibe como parámetro el ID de la publicación que queremos eliminar
const validarYEliminarPublicacion = async (idPublicacion) => {
    
    // ============================================
    // PASO 1: Obtener los datos del servidor
    // ============================================
    
    // Pedimos todas las publicaciones al servidor
    let publicaciones = await obtenerPublicaciones();
    
    // Pedimos todos los comentarios al servidor
    let comentarios = await obtenerComentarios();
    
    // Mostramos un mensaje de inicio
    console.log('=== VALIDACIÓN DE PUBLICACIÓN ===\n');
    

    // PASO 2: Buscar la publicación por su ID

    
    // Creamos una variable para guardar la publicación encontrada
    // Empieza como null (vacía) porque aún no la hemos buscado
    let publicacionEncontrada = null;
    
    // Recorremos todas las publicaciones una por una
    for (let i = 0; i < publicaciones.length; i++) {
        // Verificamos si el ID de esta publicación coincide con el que buscamos
        if (publicaciones[i].id == idPublicacion) {
            // Si coincide, guardamos esta publicación en la variable
            publicacionEncontrada = publicaciones[i];
            // Salimos del bucle porque ya encontramos lo que buscábamos
            break;
        }
    }
    
    // PASO 3: Verificar si encontramos la publicación

    
    // Si la variable sigue siendo null, significa que no encontramos la publicación
    if (publicacionEncontrada === null) {
        // Mostramos un mensaje de error
        console.log(`No se encontró la publicación con ID ${idPublicacion}`);
        // Terminamos la función aquí (return)
        return;
    }
    

    // PASO 4: Contar los comentarios de esta publicación

    
    // Creamos un contador que empieza en 0
    let contador = 0;
    
    // Recorremos todos los comentarios uno por uno
    for (let j = 0; j < comentarios.length; j++) {
        // Verificamos si el postId de este comentario coincide con el ID de la publicación
        if (comentarios[j].postId == idPublicacion) {
            // Si coincide, aumentamos el contador en 1
            contador = contador + 1;
        }
    }
    
    // Mostramos la información de la publicación encontrada
    console.log(`Publicación: ${publicacionEncontrada.title}`);
    console.log(`Comentarios: ${contador}`);
    console.log('---');

    // PASO 5: Validar si se puede eliminar

    
    // Verificamos si la publicación tiene comentarios
    if (contador > 0) {
        // Si tiene al menos 1 comentario, NO la eliminamos
        console.log('No se puede eliminar la publicación porque tiene comentarios');
    } else {
        // Si NO tiene comentarios, SÍ la eliminamos
        console.log('Eliminando publicación...');
        
        // Llamamos a la función para eliminar la publicación
        await eliminarPublicacion(idPublicacion);
        
 
        // PASO 6: Verificar que la eliminación fue exitosa

        
        // Pedimos de nuevo todas las publicaciones (después de la eliminación)
        let publicacionesActualizadas = await obtenerPublicaciones();
        
        // Creamos una variable para verificar si la publicación todavía existe
        let existe = false;
        
        // Buscamos la publicación en la lista actualizada
        for (let k = 0; k < publicacionesActualizadas.length; k++) {
            if (publicacionesActualizadas[k].id == idPublicacion) {
                // Si la encontramos, significa que NO fue eliminada
                existe = true;
                break;
            }
        }
        
        // Verificamos el resultado
        if (existe === false) {
            // Si no existe, significa que fue eliminada correctamente
            console.log('Publicación eliminada correctamente');
        }
    }
    
    // Mensaje final
    console.log('\n=== FIN ===');
};


// EJECUCIÓN DEL PROGRAMA


// Llamamos a la función principal para ejecutar todo el proceso
// El número 5 es el ID de la publicación que queremos eliminar
// Puedes cambiar este número para probar con otra publicación
validarYEliminarPublicacion(5);

