var input = document.getElementById('search');
var button = document.getElementById('button');
var datalist = document.getElementById('datalist');

// create an object ready to hold the final filtered object with rearch results
var globalObj = {};

// send xhr request to the server for each letter typed by the user
input.addEventListener('keyup', function(event){
  // get the input from the user
  var searchInput = input.value;
  console.log('this is the search input from the user', searchInput)

  // make sure there is input from the user
  if(searchInput) {
    // if there is input, make the request call
     let pageUrl = window.location.href;
    xhrRequest(urlCreator(pageUrl, searchInput), createResultArrayCb)
  }
})

// create a URL based on the input from the user
function urlCreator (url, str){
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
      globalObj = parsedObj;
      console.log('this is the parsed obj', globalObj)
      return cb(parsedObj);
    } else if (xhr.readyState === 4 && xhr.status != 200){
      // logs error if request gor all the way, but a status code other than 200 is returned
      console.log('you did not get a status code of 200')
    }
  }
  xhr.open("GET", url, true);
  xhr.send();
}

// function createResultArrayCb(obj) {
//   console.log('this is the returning obj:', obj)
//   var array = createLimitedArray(obj);
//   constructDatalist(array);
//   console.log("create results array got exported!");
// }
//
// function constructDataList(array) {
//   var lists = "";
//
//   arr.forEach(function(item) {
//     var list = document.cerateElement('li')
//     list.value = item;
//   })
//
//   datalist.appendChild(list);
// }
//
//
// function createLimitedArray(obj){
//   var limitedArray = Object.keys(obj);
//   if (limitedArray.length > 5) {
//    limitedArray = limitedArray.slice(0,5);
//  } else if (limitedArray.length === 0) {
//    // if object is empty
//    limitedArray.push('No matches found');
//  }
//  return limitedArray;
// }



button.addEventListener('click', function(event){
  event.preventDefault();
})
