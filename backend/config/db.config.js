const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger =  require('../logger')

// Load environment variables from .env file
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    logger.info('Connected to MongoDB');
})
// .catch(err => {  // no need of catch b/c  unhandledRejection handle and log to uncaughtExceptions using  winston  
//     console.error('Error connecting to MongoDB', err);
//     // process.exit(1);

// });

module.exports = mongoose;