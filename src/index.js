const axios = require('axios');
const env = require('./env');
const repositories = require('./repositories');

const app = {
  async initialize() {
    await repositories.initialize();

    return this;
  },
  async start() {
    repositories.auction.insertMany([
      {
        itemId: 1,
        bid: 10,
        buyout: 100,
        quantity: 10,
      },
      {
        itemId: 2,
        bid: 11,
        buyout: 101,
        quantity: 9,
      },
      {
        itemId: 3,
        bid: 12,
        buyout: 102,
        quantity: 8,
      },
    ]);
  },
};

app
  .initialize()
  .start();

// const baseUrl = 'https://us.api.battle.net/wow';
//
// const app = async () => {
//   try {
//     const auction = await axios.get(`${baseUrl}/auction/data/doomhammer?apikey=${env.API_KEY}`);
//     const auctionFiles = auction.data.files;
//
//   } catch (err) {
//     console.log(err);
//   }
// };
//
// app();

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
