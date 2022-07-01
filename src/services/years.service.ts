import { Query, Response } from '@interfaces/services.interface';
import booksModel from '@models/books.model';

class PublishYearsService {
  public books = booksModel;

  public async findAll(queries: Query[] = []): Promise<Response> {
    const query: any = {
      $limit: 10,
      $skip: 0,
      $sort: {
        total: -1,
      },
    };
    for (const q of queries) {
      query[q.field] = q.value;
      if (q.field === '_id') {
        query[q.field] = parseInt(q.value);
      }
    }
    const { $limit, $skip, $sort, ...subQueries } = query;
    const data = await this.books.aggregate([
      {
        $group: {
          _id: '$publish_year',
          total: {
            $sum: 1,
          },
        },
      },
      {
        $match: subQueries,
      },
      {
        $sort,
      },
      {
        $facet: {
          data: $limit === -1 ? [{ $skip }] : [{ $skip }, { $limit }],
          total: [
            {
              $count: 'total',
            },
          ],
        },
      },
    ]);
    return {
      data: data[0].data,
      total: data[0].total[0]?.total,
      skip: $skip,
      limit: $limit,
    };
  }
}

export default PublishYearsService;
