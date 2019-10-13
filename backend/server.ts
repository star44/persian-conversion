import * as express from "express";
import * as mysql from "mysql";
import * as dotenv from "dotenv";
dotenv.config();

const PORT: number = 3000;
const app = express();

const connection: mysql.Connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to Database')
});


app.get("/get-slides/:difficulty/:limit", (req, res) => {
    connection.query(
        `SELECT * FROM
            (
                SELECT T1.path, T1.sentence, T1.translation, difficulties.difficulty FROM difficulties INNER JOIN (
                    (SELECT content.sentence, translations.translation, content.path FROM content INNER JOIN translations ON content.sentence = translations.sentence) AS T1
                ) ON T1.path = difficulties.path
            ) AS T2
        WHERE difficulty < ${req.params.difficulty} ORDER BY RAND() LIMIT ${req.params.limit}`,
        (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results);
            res.send(results);
        })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

process.on('SIGINT', () => {
  console.log('SIGINT detected, running graceful shutdown');
  connection.end();
})

