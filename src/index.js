const axios = require('axios');
const env = require('./env');
const db = require('./db');

const { auction } = require('./repositories');

const app = async () => {
  try {
    await db.connect();

    await auction.create();

  } catch (err) {
    console.log(err);
    await db.close();
    process.exit(1);
  }
};

app();

process.on('unhandledRejection', (err) => {
  console.log(err);
  db.close();
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log(err);
  db.close();
  process.exit(1);
});
