document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const filterGenre = document.getElementById('filterGenre');
    const bookList = document.getElementById('bookList');

    // Updated JSON data with specific book names and images
    const booksData = [
        {"bookId": 1, "bookName": "Harry Potter and the Sorcerer's Stone", "author": "J.K. Rowling", "price": 19.99, "quantity": 7, "genre": "Fantasy", "image": "https://covers.openlibrary.org/b/id/7884238-L.jpg"},
        {"bookId": 2, "bookName": "A Game of Thrones", "author": "George R.R. Martin", "price": 29.99, "quantity": 5, "genre": "Fantasy", "image": "https://covers.openlibrary.org/b/id/8224916-L.jpg"},
        {"bookId": 3, "bookName": "Outliers: The Story of Success", "author": "Malcolm Gladwell", "price": 14.99, "quantity": 10, "genre": "Non-Fiction", "image": "https://covers.openlibrary.org/b/id/7793200-L.jpg"},
        {"bookId": 4, "bookName": "Sapiens: A Brief History of Humankind", "author": "Yuval Noah Harari", "price": 16.99, "quantity": 8, "genre": "History", "image": "https://covers.openlibrary.org/b/id/8096958-L.jpg"},
        {"bookId": 5, "bookName": "A Brief History of Time", "author": "Stephen Hawking", "price": 22.99, "quantity": 6, "genre": "Science", "image": "https://covers.openlibrary.org/b/id/8307875-L.jpg"},
        {"bookId": 6, "bookName": "The Catcher in the Rye", "author": "J.D. Salinger", "price": 18.99, "quantity": 4, "genre": "Literature", "image": "https://covers.openlibrary.org/b/id/8102430-L.jpg"},
        {"bookId": 7, "bookName": "Pride and Prejudice", "author": "Jane Austen", "price": 12.99, "quantity": 9, "genre": "Romance", "image": "https://covers.openlibrary.org/b/id/8220846-L.jpg"},
        {"bookId": 8, "bookName": "The Handmaid's Tale", "author": "Margaret Atwood", "price": 15.99, "quantity": 3, "genre": "Dystopian", "image": "https://covers.openlibrary.org/b/id/8220935-L.jpg"},
        {"bookId": 9, "bookName": "The Da Vinci Code", "author": "Dan Brown", "price": 17.99, "quantity": 12, "genre": "Thriller", "image": "https://covers.openlibrary.org/b/id/7888214-L.jpg"},
        {"bookId": 10, "bookName": "Murder on the Orient Express", "author": "Agatha Christie", "price": 13.99, "quantity": 2, "genre": "Mystery", "image": "https://covers.openlibrary.org/b/id/7875166-L.jpg"}
    ];

    // Debounce function to limit the rate at which a function can fire
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Display books
    function displayBooks(books) {
        bookList.innerHTML = '';
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book';
            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.bookName}">
                <div>
                    <h3>${book.bookName}</h3>
                    <p>Author: ${book.author}</p>
                    <p>Price: $${book.price.toFixed(2)}</p>
                    <p>Quantity: ${book.quantity}</p>
                    <p>Genre: ${book.genre}</p>
                </div>
            `;
            bookList.appendChild(bookElement);
        });
    }

    // Populate filter options
    function populateFilterOptions(books) {
        const genres = [...new Set(books.map(book => book.genre))];
        filterGenre.innerHTML += genres.map(genre => `
            <label>
                <input type="checkbox" value="${genre}" class="filterCheckbox"> ${genre}
            </label>
        `).join('');

        filterGenre.addEventListener('change', debounce(() => {
            const checkedGenres = Array.from(document.querySelectorAll('.filterCheckbox:checked')).map(cb => cb.value);
            fetchBooksByGenre(checkedGenres);
        }, 300));
    }

    // Filter books by genre
    function fetchBooksByGenre(genres) {
        const filteredBooks = booksData.filter(book => genres.length === 0 || genres.includes(book.genre));
        displayBooks(filteredBooks);
    }

    // Search functionality
    searchBar.addEventListener('input', debounce(() => {
        const query = searchBar.value.toLowerCase();
        fetchBooksByQuery(query);
    }, 300));

    // Filter books by search query
    function fetchBooksByQuery(query) {
        const filteredBooks = booksData.filter(book => book.bookName.toLowerCase().includes(query));
        displayBooks(filteredBooks);
    }

    // Initialize the display with all books and filter options
    displayBooks(booksData);
    populateFilterOptions(booksData);
});
