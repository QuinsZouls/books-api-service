import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import AuthorsController from '@controllers/authors.controller';

class AuthorsRoute implements Routes {
  public path = '/authors';
  public router = Router();
  public authorsController = new AuthorsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authorsController.get);
  }
}

export default AuthorsRoute;
