import { NextFunction, Request, Response } from 'express';
import { CreateBookDto } from '@dtos/books.dto';
import bookService from '@services/books.service';
import { Book } from '@interfaces/books.interface';
import { Response as ResponseInterface } from '@/interfaces/services.interface';
import { parseQueries } from '@/utils/queries';

class BooksController {
  public bookService = new bookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBooksData: ResponseInterface = await this.bookService.findAllBooks(parseQueries(req.query, ['$regex', '$options']));
      res.status(200).json(findAllBooksData);
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId: string = req.params.id;
      const findOneBookData: Book = await this.bookService.findBookById(bookId);

      res.status(200).json(findOneBookData);
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookData: CreateBookDto = req.body;
      const createBookData: Book = await this.bookService.createBook(bookData);

      res.status(201).json(createBookData);
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId: string = req.params.id;
      const bookData: CreateBookDto = req.body;
      const updateBookData: Book = await this.bookService.updateBook(bookId, bookData);

      res.status(200).json({ ...updateBookData, ...bookData });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId: string = req.params.id;
      const deleteBookData: Book = await this.bookService.deleteBook(bookId);

      res.status(200).json(deleteBookData);
    } catch (error) {
      next(error);
    }
  };
}

export default BooksController;
