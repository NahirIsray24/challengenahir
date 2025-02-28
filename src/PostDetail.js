//Importaciones
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PostDetail({ posts }) {
  // Se obtiene del parámetro de la URL
  const { id } = useParams();
  // Estados para almacenar la publicación, el autor y los comentarios
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  // Efecto para cargar los detalles de la publicación cuando cambia el ID
  useEffect(() => {
    const fetchPostDetails = async () => {
      // Buscar la publicación en los posts
      const foundPost = posts.find(p => p.id === parseInt(id));
      if (foundPost) {
        setPost(foundPost);
        // Solo se obtiene el autor si la publicación es de la API (tiene 'userId')
        if (foundPost.userId) {
          const authorResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${foundPost.userId}`);
          const authorData = await authorResponse.json();
          setAuthor(authorData);
        }
        // Se obtiene los comentarios de la publicación
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } else {
        // Si la publicación no está en el estado, obtenerla desde la API
        try {
          const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
          const postData = await postResponse.json();
          setPost(postData);
          // Se obtiene el autor de la publicación
          const authorResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
          const authorData = await authorResponse.json();
          setAuthor(authorData);
          // Se obtiene  los comentarios de la publicación
          const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        } catch (error) {
          console.error('Error al obtener los detalles:', error);
        }
      }
    };

    fetchPostDetails();
  }, [id, posts]);
  if (!post) return <p>Cargando...</p>;

  return (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>
      {post.userId && <p className="post-author"><strong>Autor:</strong> {author ? author.name : 'Cargando...'}</p>}
      <p className="post-body">{post.body}</p>

      <h2 className="comments-title">Comentarios</h2>
      <ul className="comments-list">
        {comments.map(comment => (
          <li key={comment.id} className="comment-item">
            <strong>{comment.name}:</strong> {comment.body}
          </li>
        ))}
      </ul>
        {/* Enlace para volver a la página principal */}
      <Link className="link" to="/">REGRESAR</Link>
    </div>
  );
}
export default PostDetail;
