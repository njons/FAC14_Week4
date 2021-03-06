// target your dom elements globally so you can access them from anywhere in the code
var input = document.getElementById("search");
var button = document.getElementById("button");
var datalist = document.getElementById("datalist");
var results = document.getElementById("results");
var resultsP = document.createElement("p");
var resultsHeading = document.getElementById("resultsHeading");

// listen for every key press (collect the input and use it to send an xhr request to the server)
input.addEventListener("keyup", function(event) {
  // get the input from the user
  var searchInput = input.value;
  if (searchInput) {
    // if there is input, make the request call
    let pageUrl = window.location.href;
    // combine the current url with the input and how to handle the response once its back (cb in the xhr function)
    xhrRequest(urlCreator(pageUrl, searchInput), constructDataList);
  }
});

button.addEventListener("click", function(event) {
  event.preventDefault();
  xhrRequest(urlCreator(window.location.href, input.value), constructDataList);
});

// create a URL based on the input from the user
function urlCreator(url, str) {
  // takes url and adds a string value that corresponds to the user search input (str)
  var searchUri = encodeURIComponent(str);
  return url + "search/" + searchUri;
}

// the generic xhr request wrapped in a function
function xhrRequest(url, cb) {
  // create the new instance of a request object
  var xhr = new XMLHttpRequest(url, cb);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // ensure that the object returned form the server is parsed
      var parsedObj = JSON.parse(xhr.responseText);
      // transfer the results into the empty object waiting for info
      return cb(parsedObj);
    } else if (xhr.readyState === 4 && xhr.status != 200) {
      // logs error if request gor all the way, but a status code other than 200 is returned
      return "you did not get a status code of 200";
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// here is were we handle the JSON
function constructDataList(resultsArray) {
  // clean list items at each keypress
  datalist.innerText = "";
  // make a list item for each question in the obj
  resultsArray.forEach(function(item) {
    var listItem = document.createElement("li");
    listItem.innerText = item.question;
    datalist.appendChild(listItem);

    // clean the results text at each click
    resultsP.innerText = "";
    // answer to question is revealed on click
    listItem.addEventListener("click", function(event) {
      resultsHeading.classList.add("show");
      resultsP.innerText = item.answer;
      results.appendChild(resultsP);
    });
  });
}
