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