FROM mongo:5.0


COPY ./books.json /books.json

CMD mongoimport --host mongo --db books --collection books --type json --drop  --file /books.json --jsonArray
