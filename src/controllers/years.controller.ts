import { NextFunction, Request, Response } from 'express';
import publishYearService from '@services/years.service';
import { Response as ResponseInterface } from '@/interfaces/services.interface';
import { parseQueries } from '@/utils/queries';

class PublishYearsController {
  public publishYearService = new publishYearService();

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responseData: ResponseInterface = await this.publishYearService.findAll(parseQueries(req.query, []));
      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  };
}

export default PublishYearsController;
