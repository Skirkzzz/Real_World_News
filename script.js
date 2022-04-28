const card = document.querySelector(".card");

fetch('https://www.reddit.com/r/manchester/new.json')
        .then(function(res) {
        //let data = object.entries(data)
        return res.json();
})
    .then(function(res) { 

    let data1, markup=``;

    const postArr = res.data.children
    
    for (let i = 0; i < postArr.length; i++) {
        data1 = postArr[i].data;
        markup+=`
        <div class="card">
        <h1 class="title">${data1.title}</h1>
        <p class="message">${data1.selftext}</p>
        <p class="author">${data1.author}</p>
        <p class=""   ></p>
        </div>
        `;
    };
    card.insertAdjacentHTML('afterbegin',markup);
})
    .catch((err)=> {
        console.log(err);
    })

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

