const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    this.filename = 'db.sqlite';
    this._connection = null;
  }

  connect() {
    if (this._connection) throw new Error('DB: connection exists');

    return new Promise((resolve, reject) => {
      this._connection = new sqlite3.Database(this.filename, (err) => {
        if (err) throw new Error('DB: connection error', err);
        resolve();
      });
    });
  }

  run(sql, params = []) {
    if (!this._connection) throw new Error('DB: not connected to database');

    return new Promise((resolve, reject) => {
      this._connection.run(sql, params, function(err) {
        if (err) return reject(err);
        resolve(this.lastID);
      })
    });
  }

  get(sql, params) {
    if (!this._connection) throw new Error('DB: not connected to database');

    return new Promise((resolve, reject) => {
      this._connection.get(sql, params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  all(sql, params) {
    if (!this._connection) throw new Error('DB: not connected to database');

    return new Promise((resolve, reject) => {
      this._connection.all(sql, params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  close() {
    if (!this._connection) throw new Error('DB: not connected to database');

    return new Promise((resolve, reject) => {
      this._connection.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    })
  }
}

module.exports = new Database();
