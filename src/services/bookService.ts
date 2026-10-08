import axios from 'axios';

export interface Book {
  id: number;
  title: string;
  author: string;
}

export interface BookListResponse {
  data: Book[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BookQuery {
  search?: string;
  page?: number;
  limit?: number;
}

export type CreateBookDto = Omit<Book, 'id'>;

const API_URL = 'http://localhost:3000/books';

export const bookService = {
  getAll: async (query: BookQuery): Promise<BookListResponse> => {
    const res = await axios.get<BookListResponse>(API_URL, { params: query });
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
