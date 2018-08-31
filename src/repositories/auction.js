const db = require('../db');

const TABLE = 'auction';

const create = () => {
  const sql = `CREATE TABLE IF NOT EXISTS ${TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    itemId INTEGER,
    bid INTEGER,
    buyout INTEGER,
    quantity INTEGER
  )`;

  return db.run(sql);
};

const drop = () => {
  return db.run(`DROP TABLE IF EXISTS ${TABLE}`);
}

const insert = (values) => {
  const sql = `INSERT INTO ${TABLE}
    (itemId, bid, buyout, quantity)
    VALUES
    ($itemId, $bid, $buyout, $quantity)
  `;

  return db.run(sql, values);
};

const insertMany = async (values) => {
  try {
    await db.run('BEGIN TRANSACTION');

    for (const value of values) {
      await insert(value);
    }

    await db.run('COMMIT');
  } catch (err) {
    await db.run('ROLLBACK');
  }
};

const update = (values) => {
  return db.run(`UPDATE ${TABLE} SET name = $name WHERE id = $id`, values);
};

const remove = (id) => {
  return db.run(`DELETE FROM ${TABLE} WHERE id = $id`, { $id: id });
};

const getAll = () => {
  return db.all(`SELECT * FROM ${TABLE}`);
}

const getById = (id) => {
  return db.get(`SELECT * FROM ${TABLE} WHERE id = $id`, { $id: id });
};

module.exports = {
  create,
  drop,
  insert,
  insertMany,
  update,
  remove,
  getAll,
  getById,
};
