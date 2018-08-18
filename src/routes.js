// link to handler.js
const handlers = require('./handlers');
const search = "/search";

const routes = (request, response) => {
  const url = request.url;

  const urlFolders = url.split('/');

  if (url === "/") {
    handlers.homeRoute(request, response);
  } else if (url.includes("public/")) {
    handlers.publicRoute(request, response, url);
  } else if (url.includes(search)) {
    handlers.queryRoute(request, response, url);
  } else {
    response.writeHead(404, {"Content-Type" : "text/html"});
    response.end(`this is the custom 404, right here <3`)
  }
};

// make the route variable accessible to server.js
module.exports = routes;
