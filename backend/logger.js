
const winston = require('winston'); //here winston default logger,  winston is transport(sorage device), there is console, file , http ... transport 
//Development and Production: 
//You can configure Winston differently depending on the environment (e.g., more verbose logging in development, minimal logging in production).


// Set up a Winston logger
const logger = winston.createLogger({
    transports: [
    new winston.transports.File({ filename: 'app.log' })
    ],

    // in production you can use process Manager PM2 for restart automatically
   // process.exit(1)// we should terminat the node  process b/c the process is unclear state and then  we should restart again.
    
    exceptionHandlers: [ //Winston itself does not terminate the process after handling an exception. 
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    ]
    });

// Add console transport only in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        colorize: true,
        handleExceptions: true,
        prettyPrint: true
    }));
}

module.exports = logger;
