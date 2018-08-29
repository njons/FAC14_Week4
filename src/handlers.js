const fs = require("fs");
const path = require("path");
// import json data
const data = require("../data.json");

// const queryString = require('querystring');
const homeRoute = (request, response) => {
  // read the file
  fs.readFile(
    // create the path where to look
    path.join(__dirname, "..", "public", "index.html"),
    (error, file) => {
      if (error) {
        // when no files come through
        respose.writeHead(500, { "Content-Type": "text/html" });
        response.end(
          `<h1>Oops something went wrong with the server. Try again!</h1>`
        );
      } else {
        // when files are found - this one is always the index so the content type can be set
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(file);
      }
    }
  );
};

const publicRoute = (request, response, url) => {
  //make sure you can handle multiple "Content-Type" for each of the files
  const extension = url.split(".")[1];
  // write an object to hold all of the different "Content-Type"s in the public folder
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/jpg",
    png: "image/png",
    json: "application/json",
    ttf: "application/octet-stream",
    ttf: "application/x-font-ttf"
  };

  // read the files
  fs.readFile(
    // tell browser trying to reach the server where the files can be found
    path.join(__dirname, "..", url),
    (error, file) => {
      if (error) {
        // when no files come through
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end(
          `<h1>Oops something went wrong with the server. Try again!</h1>`
        );
      } else {
        // when files come through
        response.writeHead(200, `Content-Type: ${extensionType[extension]}`);
        response.end(file);
      }
    }
  );
};

const queryRoute = (request, response, url) => {
  console.log("this is the url", url);
  // get the end of the URL to findout what the user searched
  let urlEnd = url.split("/search/")[1];
  console.log(`this is the URL end:`, urlEnd);
  // clean up the search by only allowing upper/lowercase letters, numbers and cutting out spaces at the end
  // console.log("this is the url end", urlEnd);
  // let sanitsiedUrl = urlEnd.replace(/[^A-Za-z0-9]/g, "").trim();
  // console.log(`this is the sanitised URL:`, urlEnd);
  //  un-URL the URL and turn it into plain language
  let decodedQuery = decodeURIComponent(urlEnd);
  console.log(`this is the decoded query`, decodedQuery);
  // this needs to be used to match in the json database
  // console.log(searchJSON(decodedQuery, data));
  const autocomplete = searchJSON(decodedQuery, data);
  response.end(JSON.stringify(autocomplete));
};

// check the user input letter by letter and determine if a match is available in the json
function searchJSON(query, data) {
  // console.log("this is query: ", query);
  // console.log("this is data:", data);
  // console.log("this is data: ", Object.keys(data));
  const matchArray = data.filter(item => {
    let questions = item.question;
    return questions.toLowerCase().includes(query.toLowerCase());
    // console.log("this is the query:", query.toLowerCase());
    // console.log("this is item in filter:", item);
  });
  console.log("this is the match array:", matchArray);
  return matchArray;
}

// // carry on the array of matches to serve the possible questions
// function filteredObject(matches) {
//   // start with empty object
//   const newObj = {};
//   // take the array of matched keys and set it value to what's the value in the json
//   matches.forEach(item => {
//     console.log("this is item in the forEach:", item);
//     newObj.question = item.question;
//     newObj.answer = item.answer;
//     // (newObj.question = data.question));
//   });
//   // return the filled new Object
//   console.log("this is the new object:", newObj.item);
//   console.log("this is the new object:", newObj);
//   // return newObj;
// }

// make the handlers functoins accessible to route.js
module.exports = { homeRoute, publicRoute, queryRoute };
