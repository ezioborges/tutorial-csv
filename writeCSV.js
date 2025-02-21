const fs = require("fs")
const { stringify } = require("csv-stringify")
const db = require("./db")
const filename = "saved_from_db.csv"
const writableStream = fs.createWriteStream(filename)

const columns = [
    "year_month",
    "month_of_release",
    "passenger_type",
    "direction",
    "sex",
    "age",
    "estimate",
]

const stringifier = stringify({ header: true, columns: columns });
db.each(`select * from migration`, (error, row) => {
  if (error) {
    return console.log(error.message);
  }
  stringifier.write(row);
});
stringifier.pipe(writableStream);
console.log("Finished writing data");