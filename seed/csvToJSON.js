const fs = require('fs');
const csvtojsonV2 = require('csvtojson');

const CSV_FILE = process.env.CSV_FILE;
const OUTPUT_FILE = process.env.OUTPUT_FILE || './output.json';

if (!CSV_FILE) {
  throw new Error('CSV PATH is required!');
}

csvtojsonV2({
  delimiter: ';',
})
  .fromFile(CSV_FILE)
  .then(json => {
    let parsedJson = [];
    for (let book of json) {
      parsedJson.push({
        code: book.ISBN,
        title: book['Book-Title'],
        author: book['Book-Author'],
        publish_year: parseInt(book['Year-Of-Publication']),
        publisher: book.Publisher,
        images: [
          {
            slug: 'image-s',
            url: book['Image-URL-S'],
          },
          {
            slug: 'image-m',
            url: book['Image-URL-M'],
          },
          {
            slug: 'image-l',
            url: book['Image-URL-L'],
          },
        ],
      });
    }
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(parsedJson));
  });
