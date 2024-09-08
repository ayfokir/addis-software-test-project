
const logger = require('../logger');

module.exports = function(err, req, res, next) {
    logger.error(`Request-Level Errors: ${err.message}`, { stack: err.stack }); // used to log error to the terminal and writ to the app.log
    res.status(500).json({error : `${err.message}`, success: false })
}
