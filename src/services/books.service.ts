import { CreateBookDto } from '@dtos/books.dto';
import { HttpException } from '@exceptions/HttpException';
import { Book } from '@interfaces/books.interface';
import { isEmpty } from '@utils/util';
import booksModel from '@models/books.model';

class BookService {
  public books = booksModel;

  public async findAllBooks(): Promise<Book[]> {
    const books: Book[] = await this.books.find();
    return books;
  }

  public async findBookById(bookId: string): Promise<Book> {
    if (isEmpty(bookId)) throw new HttpException(400, 'Book id is required');

    const findBook: Book = await this.books.findOne({ _id: bookId });
    if (!findBook) throw new HttpException(409, 'Unable to find book');

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
