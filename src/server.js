// require http module
const http = require('http');
// require routes to redirect server requests from http
const routes = require('./routes.js');


// make a server
const server = http.createServer(routes);
// setup the port (heroku style) to allow heroku to pick a port and set a local one at 3000
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
