// require('express-async-errors');  // just load only the module no needof assigne 
//express-async-errors will automatically pass it to the error-handling middleware without requiring additional try/catch blocks in your routes.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const startupDebuger =   require('debug')('app:startup')
const routes = require('./routes'); // Ensure the path is correct
const sanitize = require( 'sanitize' )
const errorHandler = require('./middleware/errorHandler')
const logger = require('./logger')
const app = express(); //  is function with type Express and app is object 

// console.log( "see  global console Info:", global.console.info)
startupDebuger(">>>>>>>>>>Prefer using the debug module over console.log for logging.") // prefer debug module instead of console.log
// the above is shorter form of like console.log

process.on('uncaughtException', ex =>  {  // for synchronous code error.  The event type 'uncaughtException' is a special event name in Node.js 
//that is emitted when an unhandled exception occurs during the execution of your application
    console.log("UncaughtException " + ex)
     process.exit(1) // for best practice exit the procesas b/c the process is unclear state , and restart again
})

process.on('unhandledRejection', ex =>  {  // for asynchronous code error, unhandledRejection  is event type 
    throw ex // winston exceptionHandlers handled if Exception rise 
})
// const p  =  Promise.reject(new Error("Somthing Happen Miserably! "))// for Asynchronous error
// p.then((data)  => console.log("data:", data))


app.use(cors());    
app.use(express.json());  
app.use(sanitize.middleware);
logger.info("app", app.get(`env`))
logger.info("Current Environment:", process.env.NODE_ENV)

app.use(routes); // Use the routes
app.use(errorHandler)// not calling instead passing a reference to error function , this error handling is not handle errors
// outside processing pipeline like  error happen during application start up
const port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if (err) throw err;
    logger.info(`Server running at http://localhost:${port}`);
});

