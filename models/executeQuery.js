const connection = require("../config/db");

const executeQuery = (query, params = []) =>
  new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

module.exports = executeQuery;
