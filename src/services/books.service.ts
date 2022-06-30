import { CreateBookDto } from '@dtos/books.dto';
import { HttpException } from '@exceptions/HttpException';
import { Book } from '@/interfaces/books.interface';
import { Query, Response } from '@interfaces/services.interface';
import { isEmpty } from '@utils/util';
import booksModel from '@models/books.model';
class BookService {
  public books = booksModel;
  public async findAllBooks(queries: Query[] = []): Promise<Response> {
    const query: any = {
      $limit: 10,
      $skip: 0,
    };
    for (const q of queries) {
      query[q.field] = q.value;
    }
    const { $limit, $skip, ...subQueries } = query;
    const books: Book[] = await this.books.find(subQueries).limit($limit).skip($skip);
    const total: number = await this.books.count(subQueries);
    return {
      data: books,
      total,
      skip: $skip,
    };
  }

  public async findBookById(bookId: string): Promise<Book> {
    if (isEmpty(bookId)) throw new HttpException(400, 'Book id is required');

    const findBook: Book = await this.books.findOne({ _id: bookId });
    if (!findBook) throw new HttpException(404, `Unable to find book with id ${bookId}`);

    return findBook;
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'book data is required');

    const findBook: Book = await this.books.findOne({ code: bookData.code });
    if (findBook) throw new HttpException(409, `Book code ${bookData.code} already exists`);

    const createBookData: Book = await this.books.create(bookData);

    return createBookData;
  }

  public async updateBook(bookId: string, bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'Book data is required');

    if (bookData.code) {
      const findBook: Book = await this.books.findOne({ code: bookData.code });
      if (findBook && findBook._id != bookId) throw new HttpException(409, `Book code ${bookData.code} already exists`);
    }

    const updateBookById: Book = await this.books.findByIdAndUpdate(bookId, bookData);
    if (!updateBookById) throw new HttpException(409, 'Unable to update book');

    return updateBookById;
  }

  public async deleteBook(bookId: string): Promise<Book> {
    const deleteBookById: Book = await this.books.findByIdAndDelete(bookId);
    if (!deleteBookById) throw new HttpException(409, 'Unable to delete book');

    return deleteBookById;
  }
}

export default BookService;
