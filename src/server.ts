import App from '@/app';
import IndexRoute from '@routes/index.route';
import BooksRoute from './routes/books.route';
import AuthorsRoute from './routes/authors.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new BooksRoute(), new AuthorsRoute()]);

app.listen();
