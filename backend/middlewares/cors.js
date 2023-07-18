const allowedCors = require('../utils/allowedCors');

const corsResolver = (req, res, next) => {
  const { origin } = req.headers; // save the request source to the origin variable
  const { method } = req; // save the request type (HTTP method) to the corresponding variable

  // save the list of headers of the original request
  const requestHeaders = req.headers['access-control-request-headers'];

  // Default value for the Access-Control-Allow-Methods header (all types of requests are allowed)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // check that the source of the request is allowed one
  if (allowedCors.includes(origin)) {
    // set the header that allows the browser to make requests from this source
    res.header('Access-Control-Allow-Origin', origin);
  }

  // If this is a preliminary request, add the necessary headers
  if (method === 'OPTIONS') {
    // allow cross-domain requests of any type (by default)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    //  allow cross-domain requests with these headers
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = corsResolver;
