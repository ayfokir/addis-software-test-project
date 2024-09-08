module.exports =  function asyncMiddleWare(handler) { // handler anonymous function 
  return async(req, res, next)  =>  { // return standared express route handler 
      try{
        console.log("inside asyncMiddleware  ")
        await handler(req, res)
      }
      catch(ex) {
      next(ex)
      }
  }
}
