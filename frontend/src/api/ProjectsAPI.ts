import { Book } from '../types/Book';

interface FetchBookResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL = 'https://mission13davis-backend.azurewebsites.net/api/Book';
// localhost = 'https://localhost:5005/api/Book'; // Replace with your actual API URL
export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortOrder: string,
  selectedCategories: string[]
): Promise<FetchBookResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `categoryTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}?pageHowMany=${pageSize}&pageNumber=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (book: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error(`Error adding book: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting book: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
