import { getAll } from "../BooksAPI";

export const getAllBooks = async () => {
  const books = await getAll();
  return books;
};
