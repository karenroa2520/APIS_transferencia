// Ejercicio: Una aplicación web requiere mostrar un listado de usuarios activos junto con la cantidad
//de publicaciones que han realizado. Sin embargo, no todos los usuarios han creado
//publicaciones. El sistema debe identificar correctamente estos casos.


//Requerimientos
//• Consultar la lista completa de usuarios.
//• Consultar la lista de publicaciones.
//• Identificar cuáles usuarios tienen publicaciones asociadas.
//• Calcular la cantidad de publicaciones por usuario.
//• Mostrar también los usuarios que no tienen publicaciones.

// Funcion para obtener todos los usuarios
const obtenerUsuarios = async () => {
    // Hacemos una petición GET para obtener todos los usuarios
    let respuesta = await fetch('http://localhost:3000/users');
    // Convertimos la respuesta a formato JSON
    let datos = await respuesta.json();
    return datos;
};

// Funcion para obtener todas las publicaciones
const obtenerPublicaciones = async () => {
    // Hacemos una peticion GET para obtener todas las publicaciones
    let respuesta = await fetch('http://localhost:3000/posts');
    // Convertimos la respuesta a formato JSON
    let datos = await respuesta.json();
    return datos;
};

// Funcion principal que procesa los datos
const mostrarUsuariosActivos = async () => {
    // Obtenemos la lista de usuarios
    let usuarios = await obtenerUsuarios();
    
    // Obtenemos la lista de publicaciones
    let publicaciones = await obtenerPublicaciones();
    
    // Mensaje de inicio
    console.log('=== USUARIOS ACTIVOS Y SUS PUBLICACIONES ===\n');
    
    // Recorremos cada usuario para verificar si esta activo
    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i];
        
        // Verificamos si el usuario esta activo
        if (usuario.active === true) {
            // Contamos cuantas publicaciones tiene este usuario
            let contador = 0;
            
            // Recorremos todas las publicaciones
            for (let j = 0; j < publicaciones.length; j++) {
                let post = publicaciones[j];
                
                // Si el userId del post coincide con el id del usuario, contamos la publicación
                if (post.userId === usuario.id) {
                    contador = contador + 1;
                }
            }
            
            // Mostramos el nombre del usuario y su cantidad de publicaciones
            console.log(`${usuario.name}: ${contador} publicaciones`);
        }
    }
    
    console.log('\n=== FIN DEL LISTADO ===');
};

// Ejecutamos la funcion principal
mostrarUsuariosActivos();