class Auction {
  constructor(db) {
    this.db = db;
    this._tableName = 'auction';

    this.create();
  }

  create() {
    const sql = `CREATE TABLE IF NOT EXISTS ${this._tableName} (
      id INT PRIMARY KEY AUTOINCREMENT,
      itemId INT,
      bid INT,
      buyout INT,
      quantity INT,
    )`;

    return this.db.run(sql);
  }

  drop() {
    return this.db.run(`DROP TABLE IF EXISTS ${this._tableName}`);
  }

  insert(values) {
    return this.db.run(`INSERT INTO ${this._tableName} (name) VALUES ($name)`, values);
  }

  async insertMany(values = []) {
    
  }

  update(values) {
    return this.db.run(`UPDATE ${this._tableName} SET name = $name WHERE id = $id`, values);
  }

  remove(id) {
    return this.db.run(`DELETE FROM ${this._tableName} WHERE id = $id`, { $id: id });
  }

  getAll() {
    return this.db.all(`SELECT * FROM ${this._tableName}`);
  }

  getById(id) {
    return this.db.get(`SELECT * FROM ${this._tableName} WHERE id = $id`, { $id: id });
  }
}

module.exports = Auction;
