const db = require('./db');

const Auction = require('./auction');

const repositories = {
  async initialize() {
    await db.connect();

    return {
      auction: new Auction(db),
    };
  },
};

module.exports = repositories;
