<!-- src/routes/BookTracker.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let books = [];
  let bookTitle = '';
  let bookAuthor = '';
  let startDate = '';
  let endDate = '';
  let bookRating = '';

  function loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      books = JSON.parse(storedBooks);
    }
  }

  function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
  }

  function addBook() {
    const title = bookTitle.trim();
    const author = bookAuthor.trim();
    const start = startDate.trim();
    const end = endDate.trim();
    const rating = String(bookRating).trim();

    if (title && author && start && rating) {
      books = [...books, { title, author, startDate: start, endDate: end, rating }];
      saveBooksToLocalStorage();
      resetInputFields();
    }
  }

  function editRating(index) {
    const newRating = prompt('Enter new rating (1-5):');
    if (newRating !== null && newRating >= 1 && newRating <= 5) {
      books[index].rating = newRating;
      saveBooksToLocalStorage();
    }
  }

  function deleteBook(index) {
    books = books.filter((_, i) => i !== index);
    saveBooksToLocalStorage();
  }

  function resetInputFields() {
    bookTitle = '';
    bookAuthor = '';
    startDate = '';
    endDate = '';
    bookRating = '';
  }

  onMount(() => {
    loadBooksFromLocalStorage();
  });
</script>

<style>
  /* Add your styles here */
  .container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin: 10px 0;
    color: #555;
  }

  input,
  button {
    margin: 5px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  button {
    background-color: #4caf50;
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>

<div class="container">
  <h1>SvelteKit Book Tracker</h1>
  <label for="bookTitle">Title:</label>
  <input bind:value={bookTitle} type="text" id="bookTitle" placeholder="Enter book title" />
  <label for="bookAuthor">Author:</label>
  <input bind:value={bookAuthor} type="text" id="bookAuthor" placeholder="Enter author" />
  <label for="startDate">Start Date:</label>
  <input bind:value={startDate} type="date" id="startDate" />
  <label for="endDate">End Date:</label>
  <input bind:value={endDate} type="date" id="endDate" />
  <label for="bookRating">Rating:</label>
  <input bind:value={bookRating} type="number" id="bookRating" min="1" max="5" placeholder="Enter rating" />
  <button on:click={addBook}>Add Book</button>
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
      {#each books as { title, author, startDate, endDate, rating, read }, index}
      <tr>
        <td>{title}</td>
        <td>{author}</td>
        <td>{startDate}</td>
        <td>{endDate ? endDate : 'Not Ended'}</td>
        <td>{rating}</td>
        <td>
          {#if !read}
            <button on:click={() => editRating(index)}>Edit Rating</button>
          {/if}
          <button on:click={() => deleteBook(index)}>Delete</button>
        </td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>
