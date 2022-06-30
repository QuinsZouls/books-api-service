import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import { CreateBookDto } from '../dtos/books.dto';
import BooksRoute from '../routes/books.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Books', () => {
  describe('[GET] /books', () => {
    it('response fineAll Books', async () => {
      const booksRoute = new BooksRoute();

      const books = booksRoute.booksController.bookService.books;

      books.count = jest.fn().mockReturnValue(3);
      books.find = jest.fn().mockImplementation(() => ({
        limit: jest.fn().mockImplementation((...args) => ({
          skip: jest.fn().mockImplementation((...arg) => [
            {
              code: 'a',
              title: 'Classical Mythology',
              author: 'Mark P. O. Morford',
              publish_year: 2001,
              publisher: 'Oxford University Press',
              images: [
                {
                  slug: 'image-l',
                  url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
                },
                {
                  slug: 'image-m',
                  url: 'http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg',
                },
                {
                  slug: 'image-s',
                  url: 'http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg',
                },
              ],
            },
            {
              code: 'b',
              title: 'Classical Mythology',
              author: 'Mark P. O. Morford',
              publish_year: 2001,
              publisher: 'Oxford University Press',
              images: [
                {
                  slug: 'image-l',
                  url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
                },
                {
                  slug: 'image-m',
                  url: 'http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg',
                },
                {
                  slug: 'image-s',
                  url: 'http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg',
                },
              ],
            },
            {
              code: 'c',
              title: 'Classical Mythology',
              author: 'Mark P. O. Morford',
              publish_year: 2001,
              publisher: 'Oxford University Press',
              images: [
                {
                  slug: 'image-l',
                  url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
                },
                {
                  slug: 'image-m',
                  url: 'http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg',
                },
                {
                  slug: 'image-s',
                  url: 'http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg',
                },
              ],
            },
          ]),
        })),
      }));
      (mongoose as any).connect = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).get(`${booksRoute.path}`).expect(200);
    });
  });

  describe('[GET] /books/:id', () => {
    it('response findOne Book', async () => {
      const userId = 'qpwoeiruty';

      const booksRoute = new BooksRoute();
      const books = booksRoute.booksController.bookService.books;

      books.findOne = jest.fn().mockReturnValue({
        code: '195153448',
        title: 'Classical Mythology',
        author: 'Mark P. O. Morford',
        publish_year: 2001,
        publisher: 'Oxford University Press',
        images: [
          {
            slug: 'image-l',
            url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
          },
          {
            slug: 'image-m',
            url: 'http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg',
          },
          {
            slug: 'image-s',
            url: 'http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg',
          },
        ],
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).get(`${booksRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[POST] /books', () => {
    it('response Create Book', async () => {
      const bookData: CreateBookDto = {
        code: 'c',
        title: 'Classical Mythology',
        author: 'Mark P. O. Morford',
        publish_year: 2003,
        publisher: 'Oxford University Press',
        images: [
          {
            slug: 'image-l',
            url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
          },
          {
            slug: 'image-m',
            url: 'http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg',
          },
          {
            slug: 'image-s',
            url: 'http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg',
          },
        ],
      };

      const booksRoute = new BooksRoute();
      const books = booksRoute.booksController.bookService.books;

      books.findOne = jest.fn().mockReturnValue(null);
      books.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        code: 'c',
        title: 'Classical Mythology',
        author: 'Mark P. O. Morford',
        publish_year: 2003,
        publisher: 'Oxford University Press',
        images: [
          {
            slug: 'image-l',
            url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
          },
          {
            slug: 'image-m',
            url: 'http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg',
          },
          {
            slug: 'image-s',
            url: 'http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg',
          },
        ],
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).post(`${booksRoute.path}`).send(bookData).expect(201);
    });
  });

  describe('[PUT] /books/:id', () => {
    it('response Update Book', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const bookData: CreateBookDto = {
        code: 'c',
        title: 'Classical Mythology',
        author: 'Mark P. O. Morford',
        publish_year: 2003,
        publisher: 'Oxford University Press',
        images: [
          {
            slug: 'image-l',
            url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
          },
          {
            slug: 'image-m',
            url: 'http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg',
          },
          {
            slug: 'image-s',
            url: 'http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg',
          },
        ],
      };

      const booksRoute = new BooksRoute();
      const books = booksRoute.booksController.bookService.books;

      if (bookData.code) {
        books.findOne = jest.fn().mockReturnValue({
          _id: userId,
          code: 'c',
          title: 'Classical Mythology',
          author: 'Mark P. O. Morford',
          publish_year: 2003,
          publisher: 'Oxford University Press',
          images: [
            {
              slug: 'image-l',
              url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
            },
            {
              slug: 'image-m',
              url: 'http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg',
            },
            {
              slug: 'image-s',
              url: 'http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg',
            },
          ],
        });
      }

      books.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: userId,
        ...bookData,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).put(`${booksRoute.path}/${userId}`).send(bookData);
    });
  });

  describe('[DELETE] /books/:id', () => {
    it('response Delete Book', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const booksRoute = new BooksRoute();
      const books = booksRoute.booksController.bookService.books;

      books.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        code: 'c',
        title: 'Classical Mythology',
        author: 'Mark P. O. Morford',
        publish_year: 2003,
        publisher: 'Oxford University Press',
        images: [
          {
            slug: 'image-l',
            url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
          },
          {
            slug: 'image-m',
            url: 'http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg',
          },
          {
            slug: 'image-s',
            url: 'http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg',
          },
        ],
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).delete(`${booksRoute.path}/${userId}`).expect(200);
    });
  });
});
