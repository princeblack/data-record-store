const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');

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

    try {
        await User.deleteMany({});
        console.log('Old users moved to a better place. Spandau');
      } catch (e) {
        console.log(e);
      };

  console.log(`I am creating 20 fake users`);

    const userPromises = new Array(20)
        .fill('Babylon')
        .map(() => {
            const user = new User({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                birtday: faker.date.past(),
                userName: faker.internet.userName(),
            })
            return user.save();
        });
    try {
        await Promise.all(userPromises).then(data =>
            console.log("Users stored in the database")
        )
    } catch (error) {
        console.log(error);
    };
})();
