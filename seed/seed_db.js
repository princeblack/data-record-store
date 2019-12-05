const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');
const Record = require('../models/Records');
const Order = require('../models/Orders');
(async() => {
    /** CONNECT TO MONGO */
    mongoose.connect('mongodb://localhost:27017/live-coding-ds', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on(
        'error',
        console.error.bind(console, 'connection error:')
    );

    mongoose.connection.on('open', () => {
        console.log(`Connected to the database...`);
    });

    console.log(`First, i will delete all the old users`);

  /** DELETE ALL USERS */
    try {
        await User.deleteMany({});
        console.log('Old users moved to a better place. Spandau');
      } catch (e) {
        console.log(e);
      };

      /** DELETE ALL RECORDS */
  try {
    await Record.deleteMany({});
    console.log('Old records moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }

  /** DELETE ALL ORDERS */
  try {
    await Order.deleteMany({});
    console.log('Old orders moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }
  console.log(`I am creating 20 fake users`);

    const userPromises = new Array(20)
        .fill('')
        .map(() => {
            const user = new User({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                birtday: faker.date.past(),
                userName: faker.internet.userName(),
                address: {
                    city: faker.address.city(),
                    street: faker.address.streetName()
                  }
            })
            const token = user.generateAuthToken();
            return user.save();
        });
    try {
        await Promise.all(userPromises).then(data =>
            console.log("Users stored in the database")
        )
    } catch (error) {
        console.log(error);
    };
    console.log(`I am creating 20 fake records`);

  /** CREATE 20 FAKE RECORDS */
  const recordPromises = Array(20)
    .fill(null)
    .map(() => {
      const record = new Record({
        title: faker.random.words(),
        artist: faker.internet.userName(),
        year: new Date(faker.date.past()).getFullYear(),
        price: faker.finance.amount()
      });

      return record.save();
    });

  try {
    await Promise.all(recordPromises);
    console.log('Records stored in the database!');
  } catch (e) {
    console.log(e);
  }

  mongoose.connection.close();
})();
