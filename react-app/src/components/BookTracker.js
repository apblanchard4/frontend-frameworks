// components/BookTracker.js
import { useState, useEffect } from 'react';
import styles from '../App.css';
const BookTracker = () => {
    const [books, setBooks] = useState([]);
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bookRating, setBookRating] = useState('');

    useEffect(() => {
        loadBooksFromLocalStorage();
    }, []);

    useEffect(() => {
        saveBooksToLocalStorage();
    }, [books]);

    const loadBooksFromLocalStorage = () => {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        }
    };

    const saveBooksToLocalStorage = () => {
        localStorage.setItem('books', JSON.stringify(books));
    };

    const addBook = () => {
        const title = bookTitle.trim();
        const author = bookAuthor.trim();
        const start = startDate.trim();
        const end = endDate.trim();
        const rating = String(bookRating).trim();

        if (title && author && start && rating) {
            setBooks([...books, { title, author, startDate: start, endDate: end, rating }]);
            resetInputFields();
        }
    };

    const editRating = (index) => {
        const newRating = prompt('Enter new rating (1-5):');
        if (newRating !== null && newRating >= 1 && newRating <= 5) {
            const updatedBooks = [...books];
            updatedBooks[index].rating = newRating;
            setBooks(updatedBooks);
        }
    };

    const deleteBook = (index) => {
        const updatedBooks = books.filter((_, i) => i !== index);
        setBooks(updatedBooks);
    };

    const resetInputFields = () => {
        setBookTitle('');
        setBookAuthor('');
        setStartDate('');
        setEndDate('');
        setBookRating('');
    };

    return (
        <div className="container">
            <h1>Next.js Book Tracker</h1>
            <label htmlFor="bookTitle">Title:</label>
            <input
                type="text"
                id="bookTitle"
                placeholder="Enter book title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
            />
            <label htmlFor="bookAuthor">Author:</label>
            <input
                type="text"
                id="bookAuthor"
                placeholder="Enter author"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
            />
            <label htmlFor="startDate">Start Date:</label>
            <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <label htmlFor="bookRating">Rating:</label>
            <input
                type="number"
                id="bookRating"
                min="1"
                max="5"
                placeholder="Enter rating"
                value={bookRating}
                onChange={(e) => setBookRating(e.target.value)}
            />
            <button onClick={addBook}>Add Book</button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Started</th>
                        <th>Ended</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(({ title, author, startDate, endDate, rating, read }, index) => (
                        <tr key={index}>
                            <td>{title}</td>
                            <td>{author}</td>
                            <td>{startDate}</td>
                            <td>{endDate ? endDate : 'Not Ended'}</td>
                            <td>{rating}</td>
                            <td>
                                {!read && <button onClick={() => editRating(index)}>Edit Rating</button>}
                                <button onClick={() => deleteBook(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookTracker;
