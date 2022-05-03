const card = document.querySelector(".card");
//const input = document.getElementById("search");
// var location = input.value;

// Initialize the map.
let map;
let geocoder;
let infowindow;

var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function () {
  var searchText = document.getElementById("search").value;
  //console.log(searchText);
  lookupLocation(searchText);
  //geocodeAddress(searchText);
});

function decodeEntity(inputStr) {
  var textarea = document.createElement("textarea");
  textarea.innerHTML = inputStr;
  return textarea.value;
}

var topSearchButton = document.getElementById("searchButton");
topSearchButton.addEventListener("click", function () {
  // Get the Location the user has entered
  var searchText = document.getElementById("search").value;
  if (searchText === "") {
    alert("Please enter a location");
    return;
  }
  // Close the search bar
  closeSearch();
  // Lookup the location with Google Maps
  lookupLocation(searchText);
  // Lookup the location with Reddit
  lookupReddit(searchText);
});
function lookupReddit(location) {
  //fetch reddit api with search text completing the reddit url
  fetch(`https://www.reddit.com/r/${location}/new.json`)
    .then(function (res) {
      // Return JSON data
      return res.json();
    })
    .then(function (res) {
      // Set up variable to write to HTML and another to contain the object from api
      // Read data from specific part of array
      let dataAll,
        markup = ``;
      const postArray = res.data.children;
      // Convert object in to array to dynamically create the cards for reddit data in HTML
      for (let i = 0; i < postArray.length; i++) {
        // If media is available then submit the information to variable "media"
        var media = "";
        if (postArray[i].data.media_embed) {
          media = postArray[i].data.media_embed.content;
        }
        dataAll = postArray[i].data;
        // Dynamically create and fill HTML cards with data
        // Decode media from transmitted HTTPS back in to unicode-8 to be shown on page
        markup += `
          <div class="card">
            <a class="post" href="https://www.reddit.com/${dataAll.permalink}">
            <h1 class="title1">${dataAll.title}</h1>
            <p class="message">${dataAll.selftext}</p>
            <p class="author">${dataAll.author}</p>
            <p class=""></p>
            ${decodeEntity(media)}
          </div>
          `;
      }
      card.insertAdjacentHTML("afterbegin", markup);
    })
    // Display error
    .catch((err) => {
      console.log(err);
    });
}

function getPlaceData() {
  // create a reference the search text

  // get the search text
  // pass the search text to the lookup location
  // var input = getElementById("mapsearch");
  var input = getElementById("location");
  input.textcontent.addEventListener("onclick");
  prompt(lookupLocation);
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: {
      lat: 53.4808,
      lng: -2.2426,
    },
  });
  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();
}

function lookupLocation(location) {
  //Append ', uk' to the end of the location
  location = location + ", uk";
  var requestOptions = {
    method: "GET",
    mode: "no-cors",
  };
  fetch(
    `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyCr-Av0kS8QAYgzV2dOHJXomDn8rxTcsRA`
  )
    .then((response) => response.json())
    .then((result) => getPlaceId(result));
}

function getPlaceId(result) {
  console.log(result);
  var placeId = result.predictions[0].place_id;
  geocodePlaceId(placeId);
}

function geocodePlaceId(placeId) {
  geocoder
    .geocode({
      placeId: placeId,
    })
    .then(({ results }) => {
      if (results[0]) {
        map.setZoom(11);
        map.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map,
          position: results[0].geometry.location,
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}
window.initMap = initMap;

var today = new Date();
document.getElementById("time").innerHTML = today.toDateString();

function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var ParallaxManager, ParallaxPart;

ParallaxPart = (function () {
  function ParallaxPart(el) {
    this.el = el;
    this.speed = parseFloat(this.el.getAttribute("data-parallax-speed"));
    this.maxScroll = parseInt(this.el.getAttribute("data-max-scroll"));
  }

  ParallaxPart.prototype.update = function (scrollY) {
    if (scrollY > this.maxScroll) {
      return;
    }
    var offset = -(scrollY * this.speed);
    this.setYTransform(offset);
  };

  ParallaxPart.prototype.setYTransform = function (val) {
    this.el.style.webkitTransform = "translate3d(0, " + val + "px, 0)";
    this.el.style.MozTransform = "translate3d(0, " + val + "px, 0)";
    this.el.style.OTransform = "translate3d(0, " + val + "px, 0)";
    this.el.style.transform = "translate3d(0, " + val + "px, 0)";
    this.el.style.msTransform = "translateY(" + val + "px)";
  };

  return ParallaxPart;
})();

ParallaxManager = (function () {
  ParallaxManager.prototype.parts = [];

  function ParallaxManager(elements) {
    if (typeof elements === "array" && elements.length) {
      this.elements = elements;
    }
    if (typeof elements === "object" && elements.item) {
      this.elements = Array.prototype.slice.call(elements);
    } else if (typeof elements === "string") {
      this.elements = document.querySelectorAll(elements);
      if (this.elements.length === 0) {
        throw new Error("Parallax: No elements found");
      }
      this.elements = Array.prototype.slice.call(this.elements);
    } else {
      throw new Error(
        "Parallax: Element variable is not a querySelector string, Array, or NodeList"
      );
    }
    for (var i in this.elements) {
      this.parts.push(new ParallaxPart(this.elements[i]));
    }
    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  ParallaxManager.prototype.onScroll = function () {
    window.requestAnimationFrame(this.scrollHandler.bind(this));
  };

  ParallaxManager.prototype.scrollHandler = function () {
    var scrollY = Math.max(window.pageYOffset, 0);
    for (var i in this.parts) {
      this.parts[i].update(scrollY);
    }
  };

  return ParallaxManager;
})();

new ParallaxManager(".parallax-layer");
//
var top = document.getElementById("a8").offsetTop;

window.onscroll = function () {
  var y =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;
  if (y >= top) {
    a8.className = "stick";
  } else {
    a8.className = "";
  }
};

var testObject = { one: 1, two: 2, three: 3 };

// Put the object into storage
localStorage.setItem("testObject", JSON.stringify(testObject));

// Retrieve the object from storage
var retrievedObject = localStorage.getItem("testObject");

console.log("retrievedObject: ", JSON.parse(retrievedObject));

localStorage.setItem(key, val);
var val = localStorage.getItem(key);
localStorage.removeItem(key);
localStorage.clear();
