import mongoose from 'mongoose';

const configOption = {
  useNewUrlParser: true,
};
const connectToDb = async () => {
  const connectionUrl = 'mongodb+srv://Ecommercy:<password>@ecommerce.ttapqkr.mongodb.net/';

  (await mongoose.connect(connectionUrl, configOption))
    .then(() => console.log('Ecommerce database connected successfully'))
    .catch((err) => console.log(`Getting Error from DB connection ${err.message}`));
};

export default connectToDb;
