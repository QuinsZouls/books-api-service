import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import PublishYearController from '@controllers/years.controller';

class PublishYearRoute implements Routes {
  public path = '/publish-year';
  public router = Router();
  public controller = new PublishYearController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.get);
  }
}

export default PublishYearRoute;
