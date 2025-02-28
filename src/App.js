//Importaciones
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostDetail from './PostDetail';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//Definicion del componente
function App() {
//Definicion de estados y variables 
  const [posts, setPosts] = useState([]); //Para almacenar lista de publicaciones
  const [searchTerm, setSearchTerm] = useState(''); //Para la busqueda de publicaciones
  const [newPost, setNewPost] = useState({ title: '', body: '' }); //Para agregar una publicacion
  const [editPost, setEditPost] = useState(null); //Para manejar la edicion 
//Ciclo de vida y efecto para obtener las publicaciones desde la API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
    
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };

    fetchPosts();
  }, []);

/*const totalFilas = posts.length;
console.log('Número de filas en la tabla:', totalFilas);*/

//Funciones internas
//Funcion AGREGAR una nueva publicacion
  const handleAddPost = async () => {
    if (!newPost.title.trim() || !newPost.body.trim() ) {
      alert('El título, contenido y autor no pueden estar vacíos.');
      return;
    }

//Se genera un nuevo ID basado en el máximo ID existente en la lista de posts
    const newId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          //userId: newPost.author,
          title: newPost.title,
          body: newPost.body
        }),
      });

      const data = await response.json();
      //console.log('Respuesta de la API:', data); //Para comprobar
      data.id = newId; // Se asigna el nuevo ID manualmente

      setPosts([data, ...posts]);// Se agrega la nueva publicación al inicio de la lista
      setNewPost({ title: '', body: '' });// Se reinicia el formulario de nueva publicación
    } catch (error) {
      console.error('Error al agregar la publicación:', error);
    }
  };
//Funcion ELIMINAR una publicacion existente 
  const handleDeletePost = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      // Se filtra la lista de posts para eliminar el que corresponde al ID recibido
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  };
// Función para activar el modo de EDICION de una publicación
  const handleEditPost = (post) => {
    setEditPost(post); // Activa el modo de edición
  };
// Función para ACTUALIZAR una publicación editada
  const handleUpdatePost = async () => {
    if (!editPost.title.trim() || !editPost.body.trim()) {
      alert('El título y el contenido no pueden estar vacíos.');
      return;
    }

    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${editPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editPost),
      });
// Se actualiza la lista de publicaciones con los cambios realizados
      setPosts(posts.map(post =>
        post.id === editPost.id ? { ...post, ...editPost } : post
      ));
      setEditPost(null); // Desactiva el modo de edición
    } catch (error) {
      console.error('Error al actualizar la publicación:', error);
    }
  };
 // Se filtra las publicaciones según el término de búsqueda ingresado
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
//Renderizado
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                 <header className="App-header">
                    <h1 className="mb-4">Publicaciones</h1>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Buscar por título..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="row">
                          <div className="col-md-3">
                            <input
                              type="text"
                              className="form-control mb-2"
                              placeholder="Título"
                              value={newPost.title}
                              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            />
                          </div>
                        <div className="col-md-3">
                          <textarea
                            className="form-control mb-2 textarea-autosize"
                            placeholder="Contenido"
                            value={newPost.body}
                            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                          />
                        </div>
                        <div className="col-md-3 d-flex align-items-end">
                          <button className="btn btn-success w-100" onClick={handleAddPost}>
                            <i className="bi bi-plus-circle"></i>
                          </button>
                        </div>
                      </div>
                      </div>
                  </header>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead className="table-secondary">
                          <tr>
                            <th>Título</th>
                            <th>Contenido</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPosts.map(post => (
                            <tr key={post.id}>
                              <td>
                                {editPost && editPost.id === post.id ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editPost.title}
                                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                                  />
                                ) : (
                                  <Link to={`/post/${post.id}`} className="text-decoration-none">
                                    {post.title}
                                  </Link>
                                )}
                              </td>
                              <td>
                                {editPost && editPost.id === post.id ? (
                                  <textarea
                                    className="form-control"
                                    value={editPost.body}
                                    onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                                  />
                                ) : (
                                  post.body.length > 100 ? post.body.slice(0, 100) + '...' : post.body
                                )}
                              </td>
                              <td>
                                {editPost && editPost.id === post.id ? (
                                  <button className="btn btn-success btn-sm" onClick={handleUpdatePost}>
                                    <i className="bi bi-bookmark-check"></i>
                                  </button>
                                ) : (
                                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditPost(post)}>
                                    <i className="bi bi-pencil-square"></i>
                                  </button>
                                )}
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeletePost(post.id)}>
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                </>
              }
            />
            <Route path="/post/:id" element={<PostDetail posts={posts} />} />
          </Routes>
      </div>
    </Router>
  );
}
// Exportación
export default App;