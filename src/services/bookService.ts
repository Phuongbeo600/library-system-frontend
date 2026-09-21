import axios from 'axios';

export interface Book {
  id: number;
  title: string;
  author: string;
}

export type CreateBookDto = Omit<Book, 'id'>;

const API_URL = 'http://localhost:3000/books';

export const bookService = {
  getAll: async (): Promise<Book[]> => {
    const res = await axios.get<Book[]>(API_URL);
    return res.data;
  },

  create: async (data: CreateBookDto): Promise<Book> => {
    const res = await axios.post<Book>(API_URL, data);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
