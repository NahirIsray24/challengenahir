 describe('Pruebas de funcionalidad y logica de negocio', () => {
// Antes de cada prueba, se visita la aplicación y se guarda el conteo inicial de publicaciones
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.get('table tbody tr').its('length').as('initialCount');
    });
// Se verifica que las publicaciones se cargan correctamente desde la API al iniciar la aplicación
    it('Permite cargar publicaciones desde la API al iniciar', function() {
      cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts').as('getPosts');
      cy.visit('http://localhost:3000');
      cy.wait('@getPosts');
      cy.get('table tbody tr').should('have.length', 100); // hay 100 publicaciones 
    });
// Se verifica que cada publicación muestre su título y un fragmento de su contenido
    it('Permite mostrar el título y un fragmento del contenido de cada publicación', () => {
      cy.get('table tbody tr').should('have.length.greaterThan', 0);
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).find('td').first().invoke('text').then((title) => {
          expect(title).to.not.be.empty; 
        });
        cy.wrap($row).find('td').eq(1).invoke('text').then((body) => {
            const snippet = body.length > 100 ? body.slice(0, 100) + '...' : body;
            expect(body).to.contain(snippet); // Asegúrate de que el contenido contenga el fragmento
        });
      });
    });
// Se verifica que se pueda navegar a la página de detalles al hacer clic en una publicación
    it('Permite navegar a la página de detalles al hacer clic en una publicación', () => {
      cy.get('table tbody tr').should('have.length.greaterThan', 0); 
      cy.get('table tbody tr').first().within(() => {
        cy.get('td').first().find('a').click(); 
      });
      cy.url().should('include', '/post/'); // la URL contiene '/post/'
      cy.get('h1').should('exist'); 
    });
// Se verifica que se pueda filtrar publicaciones por título
    it('Permite filtrar los posts por título', () => {
      const searchTerm = 'sunt aut';
      cy.get('input[placeholder="Buscar por título..."]').type(searchTerm);
      cy.get('.table tbody tr').each($row => {
        cy.wrap($row).find('td a').contains(searchTerm).should('exist');
      });
      cy.get('.table tbody tr').should('not.contain', 'título que no debería aparecer');
    });
// Se verifica que se pueda agregar una nueva publicación
   it('Permite agregar una nueva publicación', () => {
      const newPostTitle = 'Nueva Publicación de Prueba';
      const newPostBody = 'Este es el contenido de la nueva publicación de prueba.';
      cy.get('input[placeholder="Título"]').type(newPostTitle);
      cy.get('textarea[placeholder="Contenido"]').type(newPostBody);
      cy.get('button.btn-success').click();
      cy.get('table tbody').contains(newPostTitle).should('exist');
      cy.get('table tbody').contains(newPostBody).should('exist');
    });
// Se verifica que se pueda editar una publicación existente
    it('Permite editar una publicación existente', () => {
      const editedPostTitle = 'Título Editado';
      const editedPostBody = 'Este es el contenido editado de la publicación.';
      cy.get('table tbody tr').first().within(() => {
        cy.get('button.btn-warning').click(); 
      });
      cy.get('table tbody tr').first().within(() => {
        cy.get('input.form-control').clear().type(editedPostTitle);
        cy.get('textarea.form-control').clear().type(editedPostBody);
      });
      cy.get('button.btn-success.btn-sm').click();
      cy.get('table tbody').contains(editedPostTitle).should('exist');
      cy.get('table tbody').contains(editedPostBody).should('exist');
    });
// Se verifica que se pueda eliminar una publicación
    it('Permite eliminar una publicación', function() {
      cy.get('table tbody tr').its('length').as('initialCount');
      cy.get('button.btn-danger').first().click();
      cy.get('@initialCount').then((initialCount) => {
        cy.get('table tbody tr').should('have.length', initialCount - 1);
      });
    });
// Se verifica que los campos de entrada se limpien después de agregar una publicación
    it('Los campos de entrada se limpian después de agregar una publicación', function() {
      cy.get('input[placeholder="Título"]').type('Nuevo Título');
      cy.get('textarea[placeholder="Contenido"]').type('Nuevo Contenido');
      cy.get('button.btn-success').click();
      cy.get('input[placeholder="Título"]').should('be.empty');
      cy.get('textarea[placeholder="Contenido"]').should('be.empty');
    });
  
// Se verifica validaciones al agregar una publicación sin título o contenido
    it('No permite agregar publicación con título vacío', function() {
      cy.get('textarea[placeholder="Contenido"]').type('Contenido de prueba');
      cy.get('button.btn.btn-success').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('El título, contenido y autor no pueden estar vacíos.');
      });
      cy.get('table tbody tr').should('have.length', this.initialCount);
    });
  
    it('No permite agregar publicación con contenido vacío', function() {
      cy.get('input[placeholder="Título"]').type('Título de prueba');
      cy.get('button.btn.btn-success').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('El título, contenido y autor no pueden estar vacíos.');
      });
      cy.get('table tbody tr').should('have.length', this.initialCount);
    });
  
    it('No permite agregar publicación con título y contenido vacíos', function() {
      cy.get('button.btn.btn-success').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('El título, contenido y autor no pueden estar vacíos.');
      });
      cy.get('table tbody tr').should('have.length', this.initialCount);
    });

    it('Permite mostrar el título completo, el contenido y el nombre del autor', () => {
      cy.get('table tbody tr').first().within(() => {
        cy.get('td').first().find('a').click(); 
      });
      cy.get('h1').should('exist'); 
      cy.get('h1').invoke('text').then((text) => {
        expect(text).to.not.be.empty; 
      });
      cy.get('p').contains('Cargando...').should('not.exist'); 
      cy.get('p').should('not.be.empty'); 
      cy.get('p').contains('Autor:').should('exist'); 
      cy.get('p').contains('Autor:').invoke('text').then((text) => {
        expect(text).to.not.be.empty; 
      });
    });
  
    it('Permite mostrar los comentarios del post', () => {
      cy.get('table tbody tr').first().within(() => {
        cy.get('td').first().find('a').click(); 
      });
      cy.contains('Comentarios').should('exist'); 
      cy.get('ul').find('li').should('have.length.greaterThan', 0); 
      cy.get('ul li').each(($comment) => {
        cy.wrap($comment).invoke('text').then((text) => {
          expect(text).to.include(':'); 
          expect(text).to.not.be.empty; 
        });
      });
    });
  });