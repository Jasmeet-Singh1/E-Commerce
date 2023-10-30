import mongoose from 'mongoose';

const configOption = {
  useNewUrlParser: true,
};
const connectToDb = async () => {
<<<<<<< HEAD
  const connectionUrl = 'mongodb+srv://Ecommercy:dgJg6rvCcpCgmui1@ecommerce.ttapqkr.mongodb.net/';
  try {
    await mongoose.connect(connectionUrl, configOption);
    console.log('Ecommerce database connected successfully');
  } catch (err) {
    console.log(`Getting Error from DB connection ${err.message}`);
  }
=======
  const connectionUrl = 'mongodb+srv://Ecommercy:<password>@ecommerce.ttapqkr.mongodb.net/';

  (await mongoose.connect(connectionUrl, configOption))
    .then(() => console.log('Ecommerce database connected successfully'))
    .catch((err) => console.log(`Getting Error from DB connection ${err.message}`));
>>>>>>> 4cf336e5c5f5b719a767b6bfa2040fc61bdc09da
};

export default connectToDb;
