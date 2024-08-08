document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const filterGenre = document.getElementById('filterGenre');
    const bookList = document.getElementById('bookList');

    const booksData = [
        {"bookId": 1, "bookName": "Seven Secrets Of Shiva", "author": "Devdutt Pattanaik", "price": 499, "quantity": 7, "genre": "Fantasy", "image": "https://images.unsplash.com/photo-1526293542304-0afdf63016d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2V2ZW4lMjBzZWNyZXRzJTIwb2YlMjBzaGl2YXxlbnwwfHwwfHx8MA%3D%3D"},
        {"bookId": 2, "bookName": "Seven Secrets Of Vishnu", "author": "Devdutt Pattanaik", "price": 299, "quantity": 5, "genre": "Fantasy", "image": "https://plus.unsplash.com/premium_photo-1693238777087-bc36ece2e413?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2V2ZW4lMjBzZWNyZXRzJTIwb2YlMjB2aXNobnV8ZW58MHx8MHx8fDA%3D"},
        {"bookId": 3, "bookName": "Crime And Punishment", "author": "Fyodor Doestoevsky", "price": 1499, "quantity": 10, "genre": "Literature", "image": "https://images.unsplash.com/photo-1604533983460-44d5b3c7f4bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JpbWUlMjBhbmQlMjBwdW5pc2htZW50fGVufDB8fDB8fHww"},
        {"bookId": 4, "bookName": "Notes From Underground", "author": "Fyodor Doestoevsky", "price": 1699, "quantity": 8, "genre": "History", "image": "https://images.unsplash.com/photo-1554228243-ff1759819ed3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm90ZXMlMjBmcm9tJTIwdW5kZXJncm91bmR8ZW58MHx8MHx8fDA%3D"},
        {"bookId": 5, "bookName": "The Kite Runner", "author": "Khaled Hossini", "price": 299, "quantity": 6, "genre": "Fiction", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTROJAMN4uAcmyjer0P9MkkELcSvtnYovCdQ&s"},
        {"bookId": 6, "bookName": "The Song Of Achilles", "author": "Madeline Miller", "price": 199, "quantity": 4, "genre": "Literature", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL72mZLotjuvOol-rqCULru5D_OC3_TxPrTQ&s"},
        {"bookId": 7, "bookName": "Palace Of Illusions", "author": " Chitra Banerjee Divakaruni", "price": 199, "quantity": 9, "genre": "Romance", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPk_NK9-iY5BRZ58jhER4My1ztWF4CjvFlXQ&s"},
        {"bookId": 8, "bookName": "The Silent Patient", "author": "Alex Michaelides", "price": 599, "quantity": 3, "genre": "Dystopian", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHWW1F9ORdPpFwMraO7lsyOVLlMKtNN77Cw&s"},
        {"bookId": 9, "bookName": "The Seven Deaths of Evelyn Hardcastle", "author": "Stuart Turton", "price": 199, "quantity": 12, "genre": "Thriller", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4krwR4-g04aYzqhJX6cBpJ8_YKZVoeFfWxA&s"},
        {"bookId": 10, "bookName": "Hangman", "author": " Jack Heath", "price": 399, "quantity": 2, "genre": "Mystery", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWd09ZSS5UelE1QjRobs0FA2ufJ68hu_1iA&s"}
    ];

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

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
                    <p>Price: ₹${book.price.toFixed(2)}</p>
                    <p>Quantity: ${book.quantity}</p>
                    <p>Genre: ${book.genre}</p>
                </div>
            `;
            bookList.appendChild(bookElement);
        });
    }

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

    function fetchBooksByGenre(genres) {
        const filteredBooks = booksData.filter(book => genres.length === 0 || genres.includes(book.genre));
        displayBooks(filteredBooks);
    }

    searchBar.addEventListener('input', debounce(() => {
        const query = searchBar.value.toLowerCase();
        fetchBooksByQuery(query);
    }, 300));

    function fetchBooksByQuery(query) {
        const filteredBooks = booksData.filter(book => book.bookName.toLowerCase().includes(query));
        displayBooks(filteredBooks);
    }

    displayBooks(booksData);
    populateFilterOptions(booksData);
});
