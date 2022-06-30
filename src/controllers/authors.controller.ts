import { NextFunction, Request, Response } from 'express';
import authorsService from '@services/authors.service';
import { Response as ResponseInterface } from '@/interfaces/services.interface';
import { parseQueries } from '@/utils/queries';

class AuthorsController {
  public authorsService = new authorsService();

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responseData: ResponseInterface = await this.authorsService.findAllAuthors(parseQueries(req.query, ['$regex', '$options']));
      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthorsController;
