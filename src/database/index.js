import mongoose from 'mongoose';

const configOption = {
  useNewUrlParser: true,
};
const connectToDb = async () => {
  const connectionUrl = 'mongodb+srv://Ecommercy:dgJg6rvCcpCgmui1@ecommerce.ttapqkr.mongodb.net/';
  try {
    await mongoose.connect(connectionUrl, configOption);
    console.log('Ecommerce database connected successfully');
  } catch (err) {
    console.log(`Getting Error from DB connection ${err.message}`);
  }
};

export default connectToDb;
