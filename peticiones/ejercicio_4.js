// Función asíncrona que sirve para buscar una publicación usando su id
export const getPostById = async (id) => {
  // Se hace la consulta al endpoint de publicaciones pasando el id
  const query = await fetch(`http://localhost:3000/${id}`);
  // Se pasa la respuesta a formato JSON
  const dataPost = await query.json();
  // Se devuelve la información de la publicación
  return dataPost;
};

// Función asíncrona que obtiene los comentarios de una publicación específica
export const getCommetsByPost = async (postId) => {
  // Se consulta el endpoint de comentarios filtrando por el id del post
  const comentarios = await fetch(`http://localhost:3000/comments?postId=${postId}`);
  // Se convierte la respuesta a JSON
  const dataCommets = await comentarios.json();
  // Se retorna el arreglo con los comentarios
  return dataCommets;
};

// Función asíncrona que elimina una publicación usando su id
export const eliminarPublicacion = async (id) => {
  // Se envía la petición DELETE para eliminar la publicación
  await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'DELETE',
  });
  // Se devuelve un mensaje indicando que la publicación fue eliminada
  return "Publicación eliminada correctamente";
};

// Función asíncrona que elimina todos los comentarios de una publicación
export const eliminarComentarios = async (comments) => {
  // Variable para llevar el conteo de los comentarios eliminados
  let contador = 0;

  // Se recorren uno a uno los comentarios
  for (const comentario of comments) {
    // Se elimina cada comentario usando su id
    await fetch(`http://localhost:3000/comments/${comentario.id}`, {
      method: 'DELETE'
    });
    // Se aumenta el contador cada vez que se elimina un comentario
    contador++;
  }

  // Se devuelve un mensaje con la cantidad de comentarios eliminados
  return `Se eliminaron ${contador} comentarios de la publicación`;
};
