// Importo las funciones que necesito desde el archivo de transferencias
import { getPostById, getCommetsByPost } from "./ejercicio_4.js";
import { eliminarPublicacion, eliminarComentarios } from "./ejercicio_4.js";

// Defino el id del post que voy a trabajar
let postId = 3;

// Consulto la información del post usando su id
const datospost = await getPostById(postId);
console.log("Consultando Post");
console.log(datospost);

// Consulto los comentarios que tiene ese post
const datoscomentarios = await getCommetsByPost(postId);
console.log("Consultando Comentarios del Post");
console.log(datoscomentarios);

// Verifico si el post tiene comentarios
// Si el arreglo tiene al menos un comentario, la variable queda en true
let tiene = (datoscomentarios.length > 0) ? true : false;

// Si el post tiene comentarios
if (tiene) {
console.log("La publicación tiene comentarios, no se puede eliminar exactamente");

  // Primero elimino todos los comentarios del post
const eliminarComments = await eliminarComentarios(datoscomentarios);
console.log(eliminarComments);

  // Después de eliminar los comentarios, elimino la publicación
const eliminarPost = await eliminarPublicacion(postId);
console.log(eliminarPost);

} else {
  // Si el post no tiene comentarios, se puede eliminar sin problema
console.log("La publicación no tiene comentarios, sí se puede eliminar");

const eliminacion = await eliminarPublicacion(postId);
console.log(eliminacion);
}