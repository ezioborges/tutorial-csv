const fs = require("fs")
const { parse } = require("csv-parse")
const db = require("./db")

fs.createReadStream("./migration_data.csv")
  .pipe(parse({delimiter: ",", from_line: 2}))
  .on("data", function(row) {
    db.serialize(function() {
      db.run(
        `INSERT INTO migration VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [row[0], row[1], row[2], row[3], row[4], row[5], row[6]],
        function(error) {
          if (error) {
            return console.log(error.message)
          }
          console.log(`Inserted a row with the id: ${this.lastID}`);
        }
      )
    })
  })
  .on("end", function() {
    console.log("finished");    
  })
  .on("error", function(error) {
    console.log(error.message);
  })