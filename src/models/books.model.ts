import { model, Schema, Document } from 'mongoose';
import { Book } from '@interfaces/books.interface';

const bookSchema: Schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publish_year: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  images: [
    {
      slug: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],
});

const bookModel = model<Book & Document>('Book', bookSchema);

export default bookModel;
