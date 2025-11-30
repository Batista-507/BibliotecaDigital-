document.addEventListener('DOMContentLoaded', () => {
    
    // --- Referencias del DOM y Variables ---
    const booksContainer = document.getElementById('books-container');
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    const floatingSearchBar = document.getElementById('floating-search-bar');
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    let library = []; 
    
    // --- FUNCIÓN PARA GENERAR 50+ LIBROS DE EJEMPLO CON PORTADAS CURADAS ---
    
    /**
     * Genera un array de 50 libros de ejemplo con datos ficticios y portadas temáticas curadas.
     */
    function createExampleBooks() {
        const categories = ['matematicas', 'ingenieria', 'programacion', 'ciencias', 'literatura', 'historia', 'psicologia', 'negocios', 'fantasia', 'otros'];
        
        // URLs de imágenes curadas por categoría
        const categoryImageUrls = {
            'matematicas': [
                'https://images.unsplash.com/photo-1534723445831-d70364d5089f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWF0aGVtYXRpY3MsZm9ybXVsYXx8fHx8fHwxNjcwMDAwMDAw&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1509214739198-d56ee208112d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YWxnZWJyYSxnZW9tZXRyeXxlfHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1580220265780-e37456d956a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2FsY3VsdXMsZGlhZ3JhbXxlfHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1574895470162-87f174e1d1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c3RhdGlzdGljcyxjb25jZXB0fGVufHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1554465809-f64121a7114b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGh5c2ljcyxib29rfGVufHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300'
            ],
            'ingenieria': [
                'https://images.unsplash.com/photo-1581090382025-b2861e38c925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZW5naW5lZXJpbmcsY29uc3RydWN0aW9ufHwxfHx8fHwxNjcwMDAwMDAw&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1550005820-2c7102e3b9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Ymx1ZXByaW50LGFyY2hpdGVjdHVyZXxlfHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1517032768565-d01f11a4cf13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Z2VhcnMsbWVjaGFuaWNzfGVufHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1522071820081-009f0129c711?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cm9ib3RpY3MsZGVzaWdufGVufHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300'
            ],
            'programacion': [
                'https://images.unsplash.com/photo-1542831371-29b0f74f9d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y29kaW5nLGRldmVsb3BtZW50fHwxfHx8fHwxNjcwMDAwMDAw&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1498050108023-c5249f4cd085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bW9uaXRvcixhYWdlfGVufHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aGFja2VyLGN5YmVyc2VjdXJpdHl8ZW58fHx8fDE2NzAwMDAwMDk&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1515879252706-0cfa0b0d4332?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y29tcHV0ZXIsY29kZSUyMGxhbmd1YWdlfGVufHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300'
            ],
            'ciencias': [
                'https://images.unsplash.com/photo-1588471180829-87c2df47d0e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWljcm9zY29wZSxjZWxsfHwxfHx8fHwxNjcwMDAwMDAw&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1532187680790-a5908929e06c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c2NpZW5jZSxkbmF8ZW58fHx8fDE2NzAwMDAwMDk&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1576086209849-0d32c4228c2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFiaXpldmFpYmxlLGNoZW1pc3RyeXxlfHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1444703686985-274640957593?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dW5pdmVyc2Usc3BhY2V8ZW58fHx8fDE2NzAwMDAwMDk&ixlib=rb-1.2.1&q=80&w=230&h=300'
            ],
            'literatura': [
                'https://images.unsplash.com/photo-1532012197247-f47a96ba45b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8b2xkYm9vayxsaWJyYXJ5fHwxfHx8fHwxNjcwMDAwMDAw&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1495446815901-fd22b6b55d7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Ym9va3MsbGl0ZXJhdHVyZXxlfHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d3JpdGluZyxwZW58ZW58fHx8fDE2NzAwMDAwMDk&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1549444722-ed3b2e5a4f78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dGhlYXRyZSxyZWFkaW5nfGVufHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300'
            ],
            'historia': [
                'https://images.unsplash.com/photo-1510166023746-b3334237db87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YW5jaWVudG1hcCxoaXN0b3J5fHwxfHx8fHwxNjcwMDAwMDAw&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1463107052441-2b0e95c1a70c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c2Nyb2xscyxydWluc3xlfHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1548651811-196d2e684077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FycGFpbnRpbmcsY2l2aWxpemF0aW9ufGVufHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300'
            ],
            'psicologia': [
                'https://images.unsplash.com/photo-1549079532-a9b703e223b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YnJhaW4sbWluZHx8MXx8fHwxNjcwMDAwMDAw&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1498642055677-22345e6919a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YWJzdHJhY3QsdGhvdWdodHxlfHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1560790890-48e2499710f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cHN5Y2hvbG9neSxhbmFseXNpc3xlfHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300'
            ],
            'negocios': [
                'https://images.unsplash.com/photo-1579621970795-87facc2f976d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZmluYW5jZSxncmFwaHxlfHx8fHwxNjcwMDAwMDAw&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1554224155-26659c258d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bW9uZXksZWNvbm9teXxlfHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1588698947473-b09e377f0c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YnVzaW5lc3MsbWFya2V0aW5nfGVufHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300'
            ],
            'fantasia': [
                'https://images.unsplash.com/photo-1608620803530-8041c2b5d4a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZHJhZ29uLG1hZ2ljfHwxfHx8fHwxNjcwMDAwMDAw&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1550549487-eb4261775f0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2FzdGxlLGZhbnRhc3l8ZW58fHx8fDE2NzAwMDAwMDk&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1524177543503-62ae51e50666?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZWx2ZXMsd2l6YXJkfGVufHx8fHx8MTY3MDAwMDAwMA&ixlib=rb-1.2.1&q=80&w=230&h=300'
            ],
            'otros': [
                'https://images.unsplash.com/photo-1518623403610-c119642323e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YWJzdHJhY3QsYm9va3x8MXx8fHwxNjcwMDAwMDAw&ixlib=rb-1.2.1&q=80&w=230&h=300',
                'https://images.unsplash.com/photo-1533728646969-95a28c460067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZGVzaWduLHBhdHRlcm58ZW58fHx8fDE2NzAwMDAwMDk&ixlib=rb-1.2.1&q=80&w=230&h=300'
            ]
        };

        const titles = [
            "Fundamentos de {CAT}", "Guía Avanzada de {CAT}", "Colección de Ejercicios: {CAT}", "Teoría y Práctica de {CAT}",
            "Conceptos Esenciales: {CAT}", "Manual Completo de {CAT}", "Análisis Crítico de {CAT} Moderna", "Introducción a la {CAT}"
        ];
        
        const examples = [];
        let bookIdCounter = 1;

        for (let i = 0; i < 50; i++) { 
            const categoryIndex = i % categories.length;
            const category = categories[categoryIndex];
            
            // Selecciona una URL de imagen aleatoria para la categoría
            const availableUrls = categoryImageUrls[category] || categoryImageUrls['otros'];
            const imageUrl = availableUrls[Math.floor(Math.random() * availableUrls.length)];
            
            const titleIndex = Math.floor(Math.random() * titles.length);
            const titleTemplate = titles[titleIndex];
            const title = titleTemplate.replace('{CAT}', category.charAt(0).toUpperCase() + category.slice(1));
            
            examples.push({
                id: `book-${bookIdCounter++}`,
                name: title,
                desc: `Este recurso cubre los fundamentos y ejercicios de ${category}, esencial para el estudio. Autor: Estudiante Alpha. Año: 2024.`,
                category: category,
                imageUrl: imageUrl
            });
        }
        return examples;
    }


    // --- FUNCIONES DE RENDERIZADO Y UTILIDAD ---

    function getCategoryColor(category) {
        // Colores para las etiquetas, deben coincidir con los definidos en CSS para una consistencia visual
        const colors = {
            'matematicas': '#e74c3c', 'ingenieria': '#3498db', 'programacion': '#2c3e50', 'ciencias': '#16a085', 
            'literatura': '#f1c40f', 'historia': '#e67e22', 'psicologia': '#f39c12', 'negocios': '#1abc9c', 
            'fantasia': '#8e44ad', 'otros': '#cccccc'
        };
        return colors[category] || '#007bff'; // Color por defecto si no se encuentra la categoría
    }

    function renderFilteredBooks(booksToRender) {
        booksContainer.innerHTML = ''; 
        
        if (booksToRender.length === 0 && searchInput.value.trim()) {
             booksContainer.innerHTML = '<p class="no-results"><i class="fas fa-exclamation-circle"></i> No se encontraron resultados para su búsqueda. Intente con otro término.</p>';
             return;
        } else if (booksToRender.length === 0) {
            booksContainer.innerHTML = '<p class="no-results"><i class="fas fa-exclamation-circle"></i> El catálogo está actualmente vacío. ¡Vuelve pronto!</p>';
            return;
        }

        booksToRender.forEach(book => {
            const cardHTML = `
                <div class="book-card" data-id="${book.id}" data-category="${book.category}">
                    <div class="cover-wrapper">
                        <img src="${book.imageUrl}" alt="Portada de ${book.name}" class="book-cover">
                    </div>
                    <div class="book-content">
                        <h4 class="book-title">${book.name}</h4>
                        <p class="book-desc">${book.desc}</p>
                        <span class="book-tag" style="background-color: ${getCategoryColor(book.category)};">${book.category.toUpperCase()}</span>
                    </div>
                </div>
            `;
            booksContainer.insertAdjacentHTML('beforeend', cardHTML); 
        });
    }
    
    // --- LÓGICA DE BÚSQUEDA Y INTERACTIVIDAD ---

    function filterBooks() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        clearSearchBtn.style.display = searchTerm ? 'inline-block' : 'none';

        if (searchTerm === '') {
            renderFilteredBooks(library);
            return;
        }

        const filtered = library.filter(book => {
            return (
                book.name.toLowerCase().includes(searchTerm) ||
                book.desc.toLowerCase().includes(searchTerm) ||
                book.category.toLowerCase().includes(searchTerm)
            );
        });

        renderFilteredBooks(filtered);
    }
    
    /**
     * Maneja el clic en cualquier tarjeta de libro para mostrar los detalles.
     */
    function handleCardClick(event) {
        const card = event.target.closest('.book-card');
        if (!card) return; 

        const bookId = card.getAttribute('data-id');
        const book = library.find(b => b.id === bookId);

        if (book) {
            alert(`
📚 DETALLE DEL RECURSO 📚
------------------------------
Título: ${book.name}
Categoría: ${book.category.charAt(0).toUpperCase() + book.category.slice(1)}
------------------------------
Descripción:
${book.desc}

(Fin de los detalles del recurso)
            `);
        }
    }

    // --- EVENT LISTENERS ---

    searchToggleBtn.addEventListener('click', () => {
        floatingSearchBar.classList.toggle('hidden');
        if (!floatingSearchBar.classList.contains('hidden')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', filterBooks);
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterBooks(); 
        searchInput.focus();
    });
    
    booksContainer.addEventListener('click', handleCardClick);


    // --- INICIO DE LA APLICACIÓN ---
    
    // Generar y renderizar la librería inicial
    library = createExampleBooks();
    renderFilteredBooks(library);
});