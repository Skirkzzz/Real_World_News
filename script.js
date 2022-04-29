const card = document.querySelector(".card");
//const input = document.getElementById("search");
//var location = input.value;

fetch("https://www.reddit.com/r/manchester/new.json")
        .then(function(res) {
        //let data = object.entries(data)
        return res.json();
})
    .then(function(res) { 

    let dataAll, markup=``;

    const postArray = res.data.children
    
    for (let i = 0; i < postArray.length; i++) {
        dataAll = postArray[i].data;
        markup+=`
        <div class="card">
        <a class="post" href="https://www.reddit.com/${dataAll.permalink}">
        <h1 class="title">${dataAll.title}</h1>
        <p class="message">${dataAll.selftext}</p>
        <p class="author">${dataAll.author}</p>
        <p class=""   ></p>
        </div>
        `;
    };
    card.insertAdjacentHTML('afterbegin',markup);
})
    .catch((err)=> {
        console.log(err);
    })

// Initialize the map.
let map;
let geocoder;
let infowindow;
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function() {
    var searchText = document.getElementById("searchText").value;
    console.log(searchText);
    lookupLocation(searchText);
    //geocodeAddress(searchText);
});

function getPlaceData() {
    // create a reference the search text

    // get the search text
    // pass the search text to the lookup location
    var input = getElementById("mapsearch");
    t.input.textcontent.addEventListener("onclick");
    prompt(lookupLocation);
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {
            lat: 40.72,
            lng: -73.96,
        },
    });
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
}

function lookupLocation(location) {
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

var today = new Date;
document.getElementById('time').innerHTML= today.toDateString();


function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}


var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var ParallaxManager, ParallaxPart;

ParallaxPart = (function() {
  function ParallaxPart(el) {
    this.el = el;
    this.speed = parseFloat(this.el.getAttribute('data-parallax-speed'));
    this.maxScroll = parseInt(this.el.getAttribute('data-max-scroll'));
  }

  ParallaxPart.prototype.update = function(scrollY) {
    if (scrollY > this.maxScroll) { return; }
    var offset = -(scrollY * this.speed);
    this.setYTransform(offset);
  };

  ParallaxPart.prototype.setYTransform = function(val) {
    this.el.style.webkitTransform = "translate3d(0, " + val + "px, 0)";
    this.el.style.MozTransform    = "translate3d(0, " + val + "px, 0)";
    this.el.style.OTransform      = "translate3d(0, " + val + "px, 0)";
    this.el.style.transform       = "translate3d(0, " + val + "px, 0)";
    this.el.style.msTransform     = "translateY(" + val + "px)";
  };

  return ParallaxPart;

})();

ParallaxManager = (function() {
  ParallaxManager.prototype.parts = [];

  function ParallaxManager(elements) {
    if (typeof elements === 'array' && elements.length) {
      this.elements = elements;
    }
    if (typeof elements === 'object' && elements.item) {
      this.elements = Array.prototype.slice.call(elements);
    } else if (typeof elements === 'string') {
      this.elements = document.querySelectorAll(elements);
      if (this.elements.length === 0) {
        throw new Error("Parallax: No elements found");
      }
      this.elements = Array.prototype.slice.call(this.elements);
    } else {
      throw new Error("Parallax: Element variable is not a querySelector string, Array, or NodeList");
    }
    for (var i in this.elements) {
      this.parts.push(new ParallaxPart(this.elements[i]));
    }
    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  ParallaxManager.prototype.onScroll = function() {
    window.requestAnimationFrame(this.scrollHandler.bind(this));
  };

  ParallaxManager.prototype.scrollHandler = function() {
    var scrollY = Math.max(window.pageYOffset, 0);
    for (var i in this.parts) { this.parts[i].update(scrollY); }
  };

  return ParallaxManager;

})();

new ParallaxManager('.parallax-layer');
//
var top = document.getElementById('a8').offsetTop;

window.onscroll = function() {
    var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    if (y >= top) {
        a8.className = 'stick';
    }
    else {
        a8.className = '';
    }
};

