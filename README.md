# Frontend Challenge - Lista de Publicaciones

https://nahirisray24.github.io/challengenahir/

## Descripción

Este proyecto es una aplicación web que permite gestionar una lista de publicaciones utilizando datos de la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com). 

El proyecto está construido con **React** para el frontend y utiliza **SCSS** y **Bootstrap** para los estilos y la interfaz de usuario. Además, se implementaron **pruebas automatizadas** con **Cypress** para asegurar que la funcionalidad y la lógica de negocio sean correctas.

## Funcionalidades

- **Visualización de publicaciones**: La aplicación carga y muestra una lista de publicaciones en una tabla. Cada fila incluye el título y un fragmento del contenido de la publicación.
- **Página de detalles de publicación**: Al hacer clic en una publicación, se navega a una página de detalles donde se muestra el título completo, el contenido y el autor de la publicación, además de los comentarios asociados.
- **Filtrado de publicaciones**: Los usuarios pueden buscar publicaciones por título utilizando un campo de búsqueda.
- **Agregar nueva publicación**: Los usuarios pueden agregar nuevas publicaciones introduciendo un título y contenido en un formulario.
- **Editar y eliminar publicaciones**: Las publicaciones pueden ser editadas o eliminadas directamente desde la tabla.

## Tecnologías utilizadas

- **Frontend**: 
  - React
  - SCSS
  - Bootstrap
- **Pruebas**: Cypress (para pruebas de funcionalidad y lógica de negocio)
- **API**: JSONPlaceholder

## Instrucciones de instalación y ejecución local

### Requisitos previos

Asegúrate de tener **Node.js** y **npm** instalados en tu máquina.

### Pasos para ejecutar el proyecto

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone <https://github.com/NahirIsray24/challengenahir.git>
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd publicaciones-app
    ```

3. Instala las dependencias necesarias (Bootstrap,React Router,Cypress)
    ```bash
    npm install
    ```

4. Inicia la aplicación:
    ```bash
    npm start
    ```

5. Abre tu navegador y ve a `http://localhost:3000` para ver la aplicación en ejecución.

### Ejecutar las pruebas

Para ejecutar las pruebas con Cypress, sigue estos pasos:

1. Asegúrate de tener Cypress instalado (si no lo tienes, puedes instalarlo con el siguiente comando):
    ```bash
    npm install cypress --save-dev
    ```

2. Abre Cypress:
    ```bash
    npx cypress open
    ```

3. Selecciona la suite de pruebas que deseas ejecutar, y las pruebas se ejecutarán en el navegador.


## Pruebas realizadas

Se realizaron pruebas automatizadas con **Cypress** para verificar la funcionalidad y la lógica de negocio de la aplicación. A continuación, se detallan algunas de las pruebas realizadas:

### 1. **Prueba de carga de publicaciones desde la API**
   - **Descripción**: Verifica que las publicaciones se carguen correctamente desde la API cuando la aplicación se inicia.

### 2. **Mostrar título y fragmento del contenido de las publicaciones**
   - **Descripción**: Asegura que cada publicación muestra su título y un fragmento del contenido (los primeros 100 caracteres).

### 3. **Navegar a la página de detalles de una publicación**
   - **Descripción**: Verifica que al hacer clic en el título de una publicación se navegue correctamente a la página de detalles.
   - 
### 4. **Filtrar publicaciones por título**
   - **Descripción**: Verifica que el campo de búsqueda filtre las publicaciones correctamente.

### 5. **Agregar una nueva publicación**
   - **Descripción**: Verifica que los usuarios puedan agregar nuevas publicaciones.

### 6. **Editar una publicación existente**
   - **Descripción**: Verifica que los usuarios puedan editar una publicación existente.

### 7. **Eliminar una publicación**
   - **Descripción**: Verifica que los usuarios puedan eliminar una publicación.

### 8. **Validación de campos vacíos al agregar una publicación**
   - **Descripción**: Verifica que no se pueda agregar una publicación con campos vacíos.

### 9. **Limpieza de campos después de agregar una publicación**
   - **Descripción**: Verifica que los campos de entrada se limpien después de agregar una publicación.

### 10. **Mostrar comentarios de la publicación**
   - **Descripción**: Verifica que los comentarios asociados a una publicación se muestren correctamente en la página de detalles.
  
## Resultados
Todas las pruebas fueron ejecutadas con éxito, confirmando el correcto funcionamiento de la aplicación.

## Contribuciones

¡Las contribuciones son bienvenidas! 

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
