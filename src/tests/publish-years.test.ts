import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import PublishYearRoute from '../routes/years.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Publish Years', () => {
  describe('[GET] /publish-year', () => {
    it('response fineAll', async () => {
      const publishYearRoute = new PublishYearRoute();
      const books = publishYearRoute.controller.publishYearService.books;

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
      const app = new App([publishYearRoute]);
      return request(app.getServer()).get(`${publishYearRoute.path}`).expect(200);
    });
  });
});
