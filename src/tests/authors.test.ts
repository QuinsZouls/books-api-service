import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import AuthorsRoute from '../routes/authors.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Authors', () => {
  describe('[GET] /authors', () => {
    it('response fineAll Books', async () => {
      const authorsRoute = new AuthorsRoute();
      const books = authorsRoute.authorsController.authorsService.books;

      books.aggregate = jest.fn().mockReturnValue([
        {
          data: [
            {
              _id: 'a',
              total: 322,
            },
            {
              _id: 'b',
              total: 22,
            },
            {
              _id: 'c',
              total: 3,
            },
          ],
          total: [
            {
              total: 3,
            },
          ],
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([authorsRoute]);
      return request(app.getServer()).get(`${authorsRoute.path}`).expect(200);
    });
  });
});
